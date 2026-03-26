"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
// import Looks3Icon from "@mui/icons-material/Looks3";
// import TitleIcon from "@mui/icons-material/Title";
import {
  Box,
  Paper,
  IconButton,
  Divider,
  Stack,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  useTheme,
  alpha,
  CircularProgress,
  Typography,
  Alert,
  Tabs,
  Tab,
} from "@mui/material";
import {
  FormatBold as BoldIcon,
  FormatItalic as ItalicIcon,
  FormatUnderlined as UnderlineIcon,
  StrikethroughS as StrikethroughIcon,
  Link as LinkIcon,
  LinkOff as LinkOffIcon,
  Image as ImageIcon,
  FormatListBulleted as BulletListIcon,
  FormatListNumbered as NumberedListIcon,
  Code as CodeIcon,
  FormatQuote as QuoteIcon,
  FormatAlignLeft as AlignLeftIcon,
  FormatAlignCenter as AlignCenterIcon,
  FormatAlignRight as AlignRightIcon,
  Undo as UndoIcon,
  Redo as RedoIcon,
  Highlight as HighlightIcon,
  FormatClear as ClearFormatIcon,
  CloudUpload as UploadIcon,
} from "@mui/icons-material";
import ResizableImage from "./ResizableImage";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import Looks5Icon from "@mui/icons-material/Looks5";
import Looks6Icon from "@mui/icons-material/Looks6";

// --- TYPES ---
interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  minHeight?: number | string;
  blogId?: string | number; // Added blogId prop
  onImageUpload?: (
    blogId: string | number,
    formData: FormData,
  ) => Promise<{ success: boolean; publicPath?: string; error?: string }>;
}

interface MenuButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  tooltip: string;
  children: React.ReactNode;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  onClick,
  isActive = false,
  disabled = false,
  tooltip,
  children,
}) => {
  const theme = useTheme();

  return (
    <Tooltip title={tooltip} arrow>
      <span>
        <IconButton
          size="small"
          onClick={onClick}
          disabled={disabled}
          sx={{
            borderRadius: 1,
            bgcolor: isActive
              ? alpha(theme.palette.primary.main, 0.15)
              : "transparent",
            color: isActive ? "primary.main" : "text.secondary",
            "&:hover": {
              bgcolor: isActive
                ? alpha(theme.palette.primary.main, 0.25)
                : alpha(theme.palette.action.hover, 0.8),
            },
            "&.Mui-disabled": {
              color: "text.disabled",
            },
          }}
        >
          {children}
        </IconButton>
      </span>
    </Tooltip>
  );
};

interface MenuBarProps {
  editor: Editor | null;
  blogId: string | number;
  onImageUpload?: RichTextEditorProps["onImageUpload"];
}

function TabPanel(props: {
  children?: React.ReactNode;
  index: number;
  value: number;
}) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

const MenuBar: React.FC<MenuBarProps> = ({ editor, blogId, onImageUpload }) => {
  const theme = useTheme();
  const [linkDialogOpen, setLinkDialogOpen] = React.useState(false);
  const [imageDialogOpen, setImageDialogOpen] = React.useState(false);
  const [linkUrl, setLinkUrl] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [uploading, setUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [tabValue, setTabValue] = React.useState(0);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  if (!editor) return null;

  // const handleSetLink = () => {
  //   if (linkUrl) {
  //     editor
  //       .chain()
  //       .focus()
  //       .extendMarkRange("link")
  //       .setLink({ href: linkUrl })
  //       .run();
  //   }
  //   setLinkUrl("");
  //   setLinkDialogOpen(false);
  // };
  const handleSetLink = () => {
    if (linkUrl) {
      // 1. Clean up the input immediately
      const rawUrl = linkUrl.trim();

      // 2. Remove trailing slash ONLY if there's no dot (e.g., "google/" -> "google")
      const cleanUrl =
        rawUrl.endsWith("/") && !rawUrl.includes(".")
          ? rawUrl.slice(0, -1)
          : rawUrl;

      // 3. Determine if it needs https://
      const hasProtocol = /^(https?:\/\/|mailto:|tel:)/i.test(cleanUrl);
      const isRelative = cleanUrl.startsWith("/") || cleanUrl.startsWith("#");

      // 4. Final URL construction
      const finalUrl =
        !hasProtocol && !isRelative ? `https://${cleanUrl}` : cleanUrl;

      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({
          href: finalUrl,
          target: "_blank", // Ensures it always opens in a new tab
        })
        .run();
    }

    setLinkUrl("");
    setLinkDialogOpen(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setUploadError("File too large (max 5MB)");
        return;
      }
      setSelectedFile(file);
      setUploadError(null);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // --- FIXED UPLOAD LOGIC USING SERVER ACTION ---
  const handleUploadImage = async () => {
    if (!selectedFile || !onImageUpload) {
      setUploadError("Missing upload configuration");
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile); // Ensure key matches Server Action

      const result = await onImageUpload(blogId, formData);

      if (result.success && result.publicPath) {
        editor
          .chain()
          .focus()
          .insertContent({
            type: "resizableImage",
            attrs: {
              src: result.publicPath,
              alt: selectedFile.name,
            },
          })
          .run();
        handleCloseImageDialog();
      } else {
        throw new Error(result.error || "Upload failed");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setUploadError(error.message);
      } else {
        setUploadError("An unexpected error occurred");
      }
    } finally {
      setUploading(false);
    }
  };

  const handleAddImageUrl = () => {
    if (imageUrl) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: "resizableImage",
          attrs: { src: imageUrl, alt: "Image" },
        })
        .run();
    }
    handleCloseImageDialog();
  };

  const handleCloseImageDialog = () => {
    setImageDialogOpen(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    setImageUrl("");
    setUploadError(null);
    setTabValue(0);
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={0.5}
        sx={{
          p: 1,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "action.hover",
          flexWrap: "wrap",
          gap: 0.5,
        }}
      >
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          tooltip="Bold"
        >
          <BoldIcon fontSize="small" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          tooltip="Italic"
        >
          <ItalicIcon fontSize="small" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
          tooltip="Underline"
        >
          <UnderlineIcon fontSize="small" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
          tooltip="Strikethrough"
        >
          <StrikethroughIcon fontSize="small" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          isActive={editor.isActive("highlight")}
          tooltip="Highlight"
        >
          <HighlightIcon fontSize="small" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive("code")}
          tooltip="Code"
        >
          <CodeIcon fontSize="small" />
        </MenuButton>
        <Divider orientation="vertical" flexItem />
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          tooltip="Bullets"
        >
          <BulletListIcon fontSize="small" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          tooltip="Numbers"
        >
          <NumberedListIcon fontSize="small" />
        </MenuButton>
        <Divider orientation="vertical" flexItem />
        <MenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive("heading", { level: 1 })}
          tooltip="H1"
        >
          <LooksOneIcon fontSize="small" />
        </MenuButton>
        <MenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive("heading", { level: 2 })}
          tooltip="H2"
        >
          <LooksTwoIcon fontSize="small" />
        </MenuButton>
        <MenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor.isActive("heading", { level: 3 })}
          tooltip="H3"
        >
          <Looks3Icon fontSize="small" />
        </MenuButton>
        <MenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          isActive={editor.isActive("heading", { level: 4 })}
          tooltip="4"
        >
          <Looks4Icon fontSize="small" />
        </MenuButton>
        <MenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          isActive={editor.isActive("heading", { level: 5 })}
          tooltip="5"
        >
          <Looks5Icon fontSize="small" />
        </MenuButton>
        <MenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          isActive={editor.isActive("heading", { level: 6 })}
          tooltip="6"
        >
          <Looks6Icon fontSize="small" />
        </MenuButton>
        <Divider orientation="vertical" flexItem />
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
          tooltip="Left"
        >
          <AlignLeftIcon fontSize="small" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
          tooltip="Center"
        >
          <AlignCenterIcon fontSize="small" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
          tooltip="Right"
        >
          <AlignRightIcon fontSize="small" />
        </MenuButton>
        <Divider orientation="vertical" flexItem />
        {/* <MenuButton
          onClick={() => setLinkDialogOpen(true)}
          isActive={editor.isActive("link")}
          tooltip="Link"
        >
          <LinkIcon fontSize="small" />
        </MenuButton> */}
        <MenuButton
          onClick={() => {
            const previousUrl = editor.getAttributes("link").href;
            setLinkUrl(previousUrl || ""); // 👈 pre-fills URL if editing existing link
            setLinkDialogOpen(true);
          }}
          isActive={editor.isActive("link")}
          tooltip="Link"
        >
          <LinkIcon fontSize="small" />
        </MenuButton>
        <MenuButton onClick={() => setImageDialogOpen(true)} tooltip="Image">
          <ImageIcon fontSize="small" />
        </MenuButton>
        <Divider orientation="vertical" flexItem />
        <MenuButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          tooltip="Undo"
        >
          <UndoIcon fontSize="small" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          tooltip="Redo"
        >
          <RedoIcon fontSize="small" />
        </MenuButton>
      </Stack>

      <Dialog
        open={imageDialogOpen}
        onClose={handleCloseImageDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Image</DialogTitle>
        <DialogContent>
          <Tabs
            value={tabValue}
            onChange={(_, v) => setTabValue(v)}
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab label="Upload from PC" />
            <Tab label="URL" />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            {uploadError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {uploadError}
              </Alert>
            )}
            <Box
              onClick={() => fileInputRef.current?.click()}
              sx={{
                border: "2px dashed",
                borderColor: previewUrl ? "primary.main" : "divider",
                borderRadius: 2,
                p: 3,
                textAlign: "center",
                cursor: "pointer",
                bgcolor: previewUrl
                  ? alpha(theme.palette.primary.main, 0.05)
                  : "transparent",
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: "none" }}
              />
              {previewUrl ? (
                <Box
                  component="img"
                  src={previewUrl}
                  sx={{ maxWidth: "100%", maxHeight: 200, borderRadius: 1 }}
                />
              ) : (
                <Typography>Click to select image (Max 5MB)</Typography>
              )}
            </Box>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <TextField
              fullWidth
              label="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImageDialog}>Cancel</Button>
          {tabValue === 0 ? (
            <Button
              variant="contained"
              onClick={handleUploadImage}
              disabled={!selectedFile || uploading}
            >
              {uploading ? <CircularProgress size={20} /> : "Upload"}
            </Button>
          ) : (
            <Button variant="contained" onClick={handleAddImageUrl}>
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>
      {/* ADD THIS - Link Dialog was missing entirely */}
      <Dialog
        open={linkDialogOpen}
        onClose={() => {
          setLinkUrl("");
          setLinkDialogOpen(false);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Insert Link</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="URL"
            placeholder="https://example.com"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSetLink();
            }}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setLinkUrl("");
              setLinkDialogOpen(false);
            }}
          >
            Cancel
          </Button>
          {/* Button to remove existing link */}
          {editor.isActive("link") && (
            <Button
              color="error"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                setLinkDialogOpen(false);
              }}
            >
              Remove Link
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleSetLink}
            disabled={!linkUrl}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  placeholder = "Start typing...",
  minHeight = 300,
  blogId = "0",
  onImageUpload,
}) => {
  const theme = useTheme();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
      Underline,
      // Link.configure({ openOnClick: false }),
      Link.configure({
        openOnClick: false,
        autolink: true, // 👈 auto-detects URLs as you type
        linkOnPaste: true,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
          style: "color: #1976d2; text-decoration: underline; cursor: pointer;", // 👈 makes links visible in editor
        },
        // validate: (href) => /^https?:\/\//.test(href),
      }),
      ResizableImage,
      Placeholder.configure({ placeholder }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: false }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [content, editor]);

  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden" }}>
      <MenuBar editor={editor} blogId={blogId} onImageUpload={onImageUpload} />
      <Box
        sx={{
          minHeight,
          "& .tiptap": { outline: "none", padding: 2, minHeight },
        }}
      >
        <EditorContent editor={editor} />
      </Box>
    </Paper>
  );
};

export default RichTextEditor;
