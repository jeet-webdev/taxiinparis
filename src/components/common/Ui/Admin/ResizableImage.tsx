// ResizableImage.tsx - Custom TipTap extension for resizable images

import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper, type NodeViewProps } from '@tiptap/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';

// Extend TipTap commands
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    resizableImage: {
      setResizableImage: (options: { src: string; alt?: string; title?: string }) => ReturnType;
    };
  }
}

// Resizable Image Component
const ResizableImageComponent: React.FC<NodeViewProps> = ({
  node,
  updateAttributes,
  selected,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const startPos = useRef({ x: 0, y: 0, width: 0, height: 0 });

  const src = node.attrs.src as string;
  const alt = node.attrs.alt as string | undefined;
  const title = node.attrs.title as string | undefined;
  const width = node.attrs.width as number | undefined;
  const height = node.attrs.height as number | undefined;
  const alignment = (node.attrs.alignment as 'left' | 'center' | 'right') || 'center';

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, direction: string) => {
      e.preventDefault();
      e.stopPropagation();

      if (!imgRef.current) return;

      setIsResizing(true);
      setResizeDirection(direction);

      const rect = imgRef.current.getBoundingClientRect();
      startPos.current = {
        x: e.clientX,
        y: e.clientY,
        width: rect.width,
        height: rect.height,
      };
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !resizeDirection) return;

      const deltaX = e.clientX - startPos.current.x;
      const deltaY = e.clientY - startPos.current.y;

      let newWidth = startPos.current.width;
      let newHeight = startPos.current.height;

      // Calculate new dimensions based on resize direction
      if (resizeDirection.includes('e')) {
        newWidth = Math.max(50, startPos.current.width + deltaX);
      }
      if (resizeDirection.includes('w')) {
        newWidth = Math.max(50, startPos.current.width - deltaX);
      }
      if (resizeDirection.includes('s')) {
        newHeight = Math.max(50, startPos.current.height + deltaY);
      }
      if (resizeDirection.includes('n')) {
        newHeight = Math.max(50, startPos.current.height - deltaY);
      }

      // Maintain aspect ratio when resizing from corners
      if (resizeDirection.length === 2) {
        const aspectRatio = startPos.current.width / startPos.current.height;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          newHeight = newWidth / aspectRatio;
        } else {
          newWidth = newHeight * aspectRatio;
        }
      }

      updateAttributes({
        width: Math.round(newWidth),
        height: Math.round(newHeight),
      });
    },
    [isResizing, resizeDirection, updateAttributes]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    setResizeDirection(null);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const handleAlignmentChange = (newAlignment: 'left' | 'center' | 'right') => {
    updateAttributes({ alignment: newAlignment });
  };

  const getJustifyContent = () => {
    switch (alignment) {
      case 'left':
        return 'flex-start';
      case 'right':
        return 'flex-end';
      default:
        return 'center';
    }
  };

  return (
    <NodeViewWrapper>
      <Box
        ref={containerRef}
        sx={{
          display: 'flex',
          justifyContent: getJustifyContent(),
          my: 2,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'inline-block',
            lineHeight: 0,
            outline: selected ? '2px solid' : 'none',
            outlineColor: 'primary.main',
            outlineOffset: 2,
            borderRadius: 1,
          }}
        >
          <img
            ref={imgRef}
            src={src}
            alt={alt || ''}
            title={title || ''}
            style={{
              width: width ? `${width}px` : 'auto',
              height: height ? `${height}px` : 'auto',
              maxWidth: '100%',
              display: 'block',
              borderRadius: 4,
            }}
            draggable={false}
          />

          {/* Resize handles - only show when selected */}
          {selected && (
            <>
              {/* Corner handles */}
              <ResizeHandle position="nw" onMouseDown={handleMouseDown} />
              <ResizeHandle position="ne" onMouseDown={handleMouseDown} />
              <ResizeHandle position="sw" onMouseDown={handleMouseDown} />
              <ResizeHandle position="se" onMouseDown={handleMouseDown} />

              {/* Edge handles */}
              <ResizeHandle position="n" onMouseDown={handleMouseDown} />
              <ResizeHandle position="s" onMouseDown={handleMouseDown} />
              <ResizeHandle position="e" onMouseDown={handleMouseDown} />
              <ResizeHandle position="w" onMouseDown={handleMouseDown} />

              {/* Alignment buttons */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -40,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: 0.5,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  boxShadow: 2,
                  p: 0.5,
                }}
              >
                <AlignButton
                  active={alignment === 'left'}
                  onClick={() => handleAlignmentChange('left')}
                  title="Align Left"
                >
                  ◀
                </AlignButton>
                <AlignButton
                  active={alignment === 'center'}
                  onClick={() => handleAlignmentChange('center')}
                  title="Center"
                >
                  ●
                </AlignButton>
                <AlignButton
                  active={alignment === 'right'}
                  onClick={() => handleAlignmentChange('right')}
                  title="Align Right"
                >
                  ▶
                </AlignButton>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </NodeViewWrapper>
  );
};

// Resize Handle Component
interface ResizeHandleProps {
  position: string;
  onMouseDown: (e: React.MouseEvent, direction: string) => void;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({ position, onMouseDown }) => {
  const getPositionStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      width: position.length === 1 ? 8 : 10,
      height: position.length === 1 ? 8 : 10,
      backgroundColor: '#1976d2',
      border: '2px solid white',
      borderRadius: position.length === 2 ? '50%' : 2,
      zIndex: 10,
    };

    switch (position) {
      case 'nw':
        return { ...base, top: -5, left: -5, cursor: 'nw-resize' };
      case 'ne':
        return { ...base, top: -5, right: -5, cursor: 'ne-resize' };
      case 'sw':
        return { ...base, bottom: -5, left: -5, cursor: 'sw-resize' };
      case 'se':
        return { ...base, bottom: -5, right: -5, cursor: 'se-resize' };
      case 'n':
        return { ...base, top: -4, left: '50%', transform: 'translateX(-50%)', cursor: 'n-resize' };
      case 's':
        return { ...base, bottom: -4, left: '50%', transform: 'translateX(-50%)', cursor: 's-resize' };
      case 'e':
        return { ...base, right: -4, top: '50%', transform: 'translateY(-50%)', cursor: 'e-resize' };
      case 'w':
        return { ...base, left: -4, top: '50%', transform: 'translateY(-50%)', cursor: 'w-resize' };
      default:
        return base;
    }
  };

  return (
    <div
      style={getPositionStyles()}
      onMouseDown={(e) => onMouseDown(e, position)}
    />
  );
};

// Alignment Button Component
interface AlignButtonProps {
  active: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}

const AlignButton: React.FC<AlignButtonProps> = ({ active, onClick, title, children }) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    style={{
      width: 28,
      height: 28,
      border: 'none',
      borderRadius: 4,
      backgroundColor: active ? '#1976d2' : 'transparent',
      color: active ? 'white' : '#666',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
    }}
  >
    {children}
  </button>
);

// TipTap Extension
export const ResizableImage = Node.create({
  name: 'resizableImage',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: null,
      },
      height: {
        default: null,
      },
      alignment: {
        default: 'center',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img[src]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { alignment, width, height, ...rest } = HTMLAttributes;
    
    // Create wrapper div for alignment
    const wrapperStyle = `display: flex; justify-content: ${
      alignment === 'left' ? 'flex-start' : 
      alignment === 'right' ? 'flex-end' : 'center'
    }; margin: 1em 0;`;
    
    const imgStyle = `${width ? `width: ${width}px;` : ''} ${height ? `height: ${height}px;` : ''} max-width: 100%; border-radius: 4px;`;
    
    return [
      'div',
      { 
        style: wrapperStyle,
        'data-type': 'resizableImage',
        'data-alignment': alignment || 'center',
      },
      ['img', mergeAttributes(rest, { style: imgStyle })]
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageComponent);
  },

  addCommands() {
    return {
      setResizableImage:
        (options: { src: string; alt?: string; title?: string }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});

export default ResizableImage;