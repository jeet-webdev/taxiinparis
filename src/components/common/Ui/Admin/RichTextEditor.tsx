'use client';

import React, { useEffect } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import TitleIcon from '@mui/icons-material/Title';
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
} from '@mui/material';
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
} from '@mui/icons-material';
import ResizableImage from './ResizableImage';

// Get API URL from environment or use default
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  minHeight?: number | string;
  uploadEndpoint?: string;
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
            bgcolor: isActive ? alpha(theme.palette.primary.main, 0.15) : 'transparent',
            color: isActive ? 'primary.main' : 'text.secondary',
            '&:hover': {
              bgcolor: isActive
                ? alpha(theme.palette.primary.main, 0.25)
                : alpha(theme.palette.action.hover, 0.8),
            },
            '&.Mui-disabled': {
              color: 'text.disabled',
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
  uploadEndpoint: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

const MenuBar: React.FC<MenuBarProps> = ({ editor, uploadEndpoint }) => {
  const theme = useTheme();
  const [linkDialogOpen, setLinkDialogOpen] = React.useState(false);
  const [imageDialogOpen, setImageDialogOpen] = React.useState(false);
  const [linkUrl, setLinkUrl] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [uploading, setUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [tabValue, setTabValue] = React.useState(0);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  if (!editor) {
    return null;
  }

  const handleSetLink = () => {
    if (linkUrl) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
    }
    setLinkUrl('');
    setLinkDialogOpen(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'];
      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

      const isValidType = allowedTypes.includes(file.type) || file.type.startsWith('image/');
      const isValidExtension = allowedExtensions.includes(fileExtension);

      if (!isValidType && !isValidExtension) {
        setUploadError('Invalid file type. Please select a JPEG, PNG, GIF, or WebP image.');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setUploadError('File too large. Maximum size is 5MB.');
        return;
      }

      setSelectedFile(file);
      setUploadError(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      console.log('Uploading to:', uploadEndpoint);

      const response = await fetch(uploadEndpoint, {
        method: 'POST',
        body: formData,
        credentials: 'include', // Important for CORS with credentials
      });

      console.log('Upload response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
        throw new Error(errorData.error || `Upload failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('Upload successful:', data);

      // Insert resizable image into editor using insertContent
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'resizableImage',
          attrs: {
            src: data.url,
            alt: selectedFile.name,
          },
        })
        .run();

      handleCloseImageDialog();
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleAddImageUrl = () => {
    if (imageUrl) {
      // Insert resizable image from URL using insertContent
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'resizableImage',
          attrs: {
            src: imageUrl,
            alt: 'Image',
          },
        })
        .run();
    }
    handleCloseImageDialog();
  };

  const handleCloseImageDialog = () => {
    setImageDialogOpen(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    setImageUrl('');
    setUploadError(null);
    setTabValue(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openLinkDialog = () => {
    const previousUrl = editor.getAttributes('link').href || '';
    setLinkUrl(previousUrl);
    setLinkDialogOpen(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const event = {
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileSelect(event);
    }
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={0.5}
        sx={{
          p: 1,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'action.hover',
          flexWrap: 'wrap',
          gap: 0.5,
        }}
      >
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          tooltip="Bold (Ctrl+B)"
        >
          <BoldIcon fontSize="small" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          tooltip="Italic (Ctrl+I)"
        >
          <ItalicIcon fontSize="small" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          tooltip="Underline (Ctrl+U)"
        >
          <UnderlineIcon fontSize="small" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          tooltip="Strikethrough"
        >
          <StrikethroughIcon fontSize="small" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          isActive={editor.isActive('highlight')}
          tooltip="Highlight"
        >
          <HighlightIcon fontSize="small" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive('code')}
          tooltip="Inline Code"
        >
          <CodeIcon fontSize="small" />
        </MenuButton>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          tooltip="Bullet List"
        >
          <BulletListIcon fontSize="small" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          tooltip="Numbered List"
        >
          <NumberedListIcon fontSize="small" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          tooltip="Quote"
        >
          <QuoteIcon fontSize="small" />
        </MenuButton>
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        <MenuButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          isActive={editor.isActive('paragraph')}
          tooltip="Paragraph"
        >
          <TitleIcon fontSize="small" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          tooltip="Heading 1"
        >
          <LooksOneIcon fontSize="small" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          tooltip="Heading 2"
        >
          <LooksTwoIcon fontSize="small" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          tooltip="Heading 3"
        >
          <Looks3Icon fontSize="small" />
        </MenuButton>
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          tooltip="Align Left"
        >
          <AlignLeftIcon fontSize="small" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          tooltip="Align Center"
        >
          <AlignCenterIcon fontSize="small" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          tooltip="Align Right"
        >
          <AlignRightIcon fontSize="small" />
        </MenuButton>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        <MenuButton onClick={openLinkDialog} isActive={editor.isActive('link')} tooltip="Add Link">
          <LinkIcon fontSize="small" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive('link')}
          tooltip="Remove Link"
        >
          <LinkOffIcon fontSize="small" />
        </MenuButton>

        <MenuButton onClick={() => setImageDialogOpen(true)} tooltip="Add Image">
          <ImageIcon fontSize="small" />
        </MenuButton>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        <MenuButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          tooltip="Undo (Ctrl+Z)"
        >
          <UndoIcon fontSize="small" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          tooltip="Redo (Ctrl+Y)"
        >
          <RedoIcon fontSize="small" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          tooltip="Clear Formatting"
        >
          <ClearFormatIcon fontSize="small" />
        </MenuButton>
      </Stack>

      {/* Link Dialog */}
      <Dialog
        open={linkDialogOpen}
        onClose={() => setLinkDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Add Link</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="URL"
            placeholder="https://example.com"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLinkDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSetLink}>
            Add Link
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Dialog with Upload */}
      <Dialog open={imageDialogOpen} onClose={handleCloseImageDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add Image</DialogTitle>
        <DialogContent>
          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
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
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              sx={{
                border: '2px dashed',
                borderColor: previewUrl ? 'primary.main' : 'divider',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                bgcolor: previewUrl ? alpha(theme.palette.primary.main, 0.05) : 'transparent',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.jpg,.jpeg,.png,.gif,.webp"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />

              {previewUrl ? (
                <Box>
                  <Box
                    component="img"
                    src={previewUrl}
                    alt="Preview"
                    sx={{
                      maxWidth: '100%',
                      maxHeight: 200,
                      borderRadius: 1,
                      mb: 1,
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {selectedFile?.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Click or drag to replace
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <UploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                  <Typography variant="body1" gutterBottom>
                    Drag and drop an image here
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    or click to select a file
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1, display: 'block' }}
                  >
                    Supported: JPEG, PNG, GIF, WebP (max 5MB)
                  </Typography>
                </Box>
              )}
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <TextField
              autoFocus
              fullWidth
              label="Image URL"
              placeholder="https://example.com/image.jpg"
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
              startIcon={uploading ? <CircularProgress size={16} /> : <UploadIcon />}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
          ) : (
            <Button variant="contained" onClick={handleAddImageUrl} disabled={!imageUrl}>
              Add Image
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  placeholder = 'Start typing...',
  minHeight = 150,
  uploadEndpoint = `${API_URL}/admin/upload`,
}) => {
  const theme = useTheme();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'tiptap-link',
        },
      }),
      ResizableImage, // Use ResizableImage instead of regular Image
      Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        multicolor: false,
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });
  useEffect(() => {
    if (!editor) return;

    // Only update if content coming from outside is different
    const currentHTML = editor.getHTML();
    if (content && content !== currentHTML) {
      editor.commands.setContent(content, { emitUpdate: false }); // false = don't trigger history
    }
  }, [content, editor]);

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        '&:focus-within': {
          borderColor: 'primary.main',
          boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
        },
      }}
    >
      <MenuBar editor={editor} uploadEndpoint={uploadEndpoint} />
      <Box
        sx={{
          minHeight,
          '& .tiptap': {
            outline: 'none',
            padding: 2,
            minHeight,
            '& p': {
              margin: 0,
              marginBottom: 1,
            },
            '& p.is-editor-empty:first-of-type::before': {
              color: 'text.disabled',
              content: 'attr(data-placeholder)',
              float: 'left',
              height: 0,
              pointerEvents: 'none',
            },
            '& ul, & ol': {
              paddingLeft: 3,
              margin: '0.5em 0',
            },
            '& blockquote': {
              borderLeft: `3px solid ${theme.palette.divider}`,
              paddingLeft: 2,
              marginLeft: 0,
              marginRight: 0,
              color: 'text.secondary',
              fontStyle: 'italic',
            },
            '& code': {
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              borderRadius: 0.5,
              padding: '0.2em 0.4em',
              fontFamily: 'monospace',
              fontSize: '0.9em',
            },
            '& pre': {
              backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f5f5f5',
              borderRadius: 1,
              padding: 2,
              overflow: 'auto',
              '& code': {
                backgroundColor: 'transparent',
                padding: 0,
              },
            },
            '& .tiptap-link': {
              color: 'primary.main',
              textDecoration: 'underline',
              cursor: 'pointer',
            },
            '& mark': {
              backgroundColor: alpha(theme.palette.warning.main, 0.3),
              borderRadius: 0.25,
              padding: '0.1em 0.2em',
            },
          },
        }}
      >
        <EditorContent editor={editor} />
      </Box>
    </Paper>
  );
};

export default RichTextEditor;
