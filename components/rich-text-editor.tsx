"use client";

import { useState, useCallback, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Unlink,
  Heading1,
  Heading2,
  Heading3,
  Minus,
  ImageIcon,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  blogId?: string; // Blog ID for image upload
  onImageUpload?: (file: File) => Promise<string>; // Custom image upload handler
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = "Start writing...",
  disabled = false,
  className,
  blogId,
  onImageUpload,
}: RichTextEditorProps) {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isInsertingImage = useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
        resize: {
          enabled: true,
          directions: ["bottom-right", "bottom-left", "top-right", "top-left"],
          minWidth: 100,
          minHeight: 100,
          alwaysPreserveAspectRatio: true,
        },
        HTMLAttributes: {
          class: "rounded-lg cursor-pointer max-w-full h-auto",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    editable: !disabled,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      // Don't trigger onChange during image insertion
      if (!isInsertingImage.current) {
        onChange(editor.getHTML());
      }
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[580px] w-full px-4 py-3",
        style: "img { max-width: 100%; height: auto; }",
      },
      handleDrop: (view, event, slice, moved) => {
        if (
          !moved &&
          event.dataTransfer &&
          event.dataTransfer.files &&
          event.dataTransfer.files.length > 0
        ) {
          const files = Array.from(event.dataTransfer.files);
          const imageFiles = files.filter((file) =>
            file.type.startsWith("image/"),
          );

          if (imageFiles.length > 0) {
            event.preventDefault();

            // Validate and upload all images
            const validImages = imageFiles.filter((file) => {
              // Validate file type
              const allowedTypes = [
                "image/jpeg",
                "image/png",
                "image/webp",
                "image/gif",
              ];
              if (!allowedTypes.includes(file.type)) {
                toast.error(
                  `${file.name}: Invalid file type. Please use JPEG, PNG, WebP, or GIF.`,
                );
                return false;
              }

              // Validate file size (5MB)
              if (file.size > 5 * 1024 * 1024) {
                toast.error(
                  `${file.name}: File is too large. Maximum size is 5MB.`,
                );
                return false;
              }

              return true;
            });

            // Upload all valid images
            if (onImageUpload && validImages.length > 0) {
              validImages.forEach((file) => {
                handleImageUpload(file);
              });
            }

            return true;
          }
        }
        return false;
      },
      handlePaste: (view, event, slice) => {
        const items = event.clipboardData?.items;
        if (items) {
          const imageFiles: File[] = [];

          // Collect all image files from clipboard
          for (let i = 0; i < items.length; i++) {
            if (items[i].type.startsWith("image/")) {
              const file = items[i].getAsFile();
              if (file) {
                imageFiles.push(file);
              }
            }
          }

          if (imageFiles.length > 0) {
            event.preventDefault();

            // Validate and upload all images
            const validImages = imageFiles.filter((file) => {
              // Validate file type
              const allowedTypes = [
                "image/jpeg",
                "image/png",
                "image/webp",
                "image/gif",
              ];
              if (!allowedTypes.includes(file.type)) {
                toast.error(
                  "Invalid file type. Please paste JPEG, PNG, WebP, or GIF images.",
                );
                return false;
              }

              // Validate file size (5MB)
              if (file.size > 5 * 1024 * 1024) {
                toast.error("File is too large. Maximum size is 5MB.");
                return false;
              }

              return true;
            });

            // Upload all valid images
            if (onImageUpload && validImages.length > 0) {
              validImages.forEach((file) => {
                handleImageUpload(file);
              });
            }

            return true;
          }
        }
        return false;
      },
    },
  });

  const openLinkDialog = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href || "";
    setLinkUrl(previousUrl);
    setLinkDialogOpen(true);
  }, [editor]);

  const handleSetLink = useCallback(() => {
    if (!editor) return;

    if (linkUrl === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      let finalUrl = linkUrl;
      if (!/^https?:\/\//i.test(linkUrl) && !/^mailto:/i.test(linkUrl)) {
        finalUrl = `https://${linkUrl}`;
      }
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: finalUrl })
        .run();
    }

    setLinkDialogOpen(false);
    setLinkUrl("");
  }, [editor, linkUrl]);

  const handleImageUpload = useCallback(
    async (file: File) => {
      if (!editor || !onImageUpload) return;

      setIsUploadingImage(true);
      const uploadToast = toast.loading("Uploading image...");

      try {
        // Call the custom image upload handler
        const imageUrl = await onImageUpload(file);

        // Set flag to prevent onChange during image insertion
        isInsertingImage.current = true;

        // Insert the image into the editor
        editor.chain().focus().setImage({ src: imageUrl }).run();

        // Reset flag after a brief delay to ensure the update has processed
        setTimeout(() => {
          isInsertingImage.current = false;
        }, 100);

        toast.success("Image uploaded!", { id: uploadToast });
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Failed to upload image", { id: uploadToast });
        isInsertingImage.current = false;
      } finally {
        setIsUploadingImage(false);
      }
    },
    [editor, onImageUpload],
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        const fileArray = Array.from(files);

        // Validate and upload all selected images
        const validImages = fileArray.filter((file) => {
          // Validate file type
          const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
          ];
          if (!allowedTypes.includes(file.type)) {
            toast.error(
              `${file.name}: Invalid file type. Please select JPEG, PNG, WebP, or GIF images.`,
            );
            return false;
          }

          // Validate file size (5MB)
          if (file.size > 5 * 1024 * 1024) {
            toast.error(
              `${file.name}: File is too large. Maximum size is 5MB.`,
            );
            return false;
          }

          return true;
        });

        // Upload all valid images
        validImages.forEach((file) => {
          handleImageUpload(file);
        });
      }

      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [handleImageUpload],
  );

  const triggerImageUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  if (!editor) {
    return null;
  }

  // Toolbar button with tooltip wrapper
  const ToolbarButton = ({
    onClick,
    disabled: btnDisabled,
    active,
    tooltip,
    children,
  }: {
    onClick: () => void;
    disabled?: boolean;
    active?: boolean;
    tooltip: string;
    children: React.ReactNode;
  }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant={active ? "secondary" : "ghost"}
          size="icon"
          className="h-8 w-8"
          onClick={onClick}
          disabled={btnDisabled}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );

  // Toolbar toggle with tooltip wrapper
  const ToolbarToggle = ({
    pressed,
    onPressedChange,
    disabled: toggleDisabled,
    tooltip,
    children,
  }: {
    pressed: boolean;
    onPressedChange: () => void;
    disabled?: boolean;
    tooltip: string;
    children: React.ReactNode;
  }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          size="sm"
          pressed={pressed}
          onPressedChange={onPressedChange}
          disabled={toggleDisabled}
          className="h-8 w-8 p-0"
        >
          {children}
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <TooltipProvider delayDuration={300}>
      <div
        className={cn(
          "rounded-md border bg-background flex flex-col",
          className,
        )}
      >
        {/* Fixed Toolbar */}
        <div className="flex flex-wrap items-center gap-0.5 border-b p-1 bg-background rounded-t-md">
          {/* Undo/Redo */}
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo() || disabled}
            tooltip="Undo"
          >
            <Undo className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo() || disabled}
            tooltip="Redo"
          >
            <Redo className="h-4 w-4" />
          </ToolbarButton>

          <Separator orientation="vertical" className="mx-1 h-6" />

          {/* Headings */}
          <ToolbarToggle
            pressed={editor.isActive("heading", { level: 1 })}
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            disabled={disabled}
            tooltip="Heading 1"
          >
            <Heading1 className="h-4 w-4" />
          </ToolbarToggle>
          <ToolbarToggle
            pressed={editor.isActive("heading", { level: 2 })}
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            disabled={disabled}
            tooltip="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </ToolbarToggle>
          <ToolbarToggle
            pressed={editor.isActive("heading", { level: 3 })}
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            disabled={disabled}
            tooltip="Heading 3"
          >
            <Heading3 className="h-4 w-4" />
          </ToolbarToggle>

          <Separator orientation="vertical" className="mx-1 h-6" />

          {/* Text Formatting */}
          <ToolbarToggle
            pressed={editor.isActive("bold")}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            disabled={disabled}
            tooltip="Bold"
          >
            <Bold className="h-4 w-4" />
          </ToolbarToggle>
          <ToolbarToggle
            pressed={editor.isActive("italic")}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            disabled={disabled}
            tooltip="Italic"
          >
            <Italic className="h-4 w-4" />
          </ToolbarToggle>
          <ToolbarToggle
            pressed={editor.isActive("strike")}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            disabled={disabled}
            tooltip="Strikethrough"
          >
            <Strikethrough className="h-4 w-4" />
          </ToolbarToggle>
          <ToolbarToggle
            pressed={editor.isActive("code")}
            onPressedChange={() => editor.chain().focus().toggleCode().run()}
            disabled={disabled}
            tooltip="Inline Code"
          >
            <Code className="h-4 w-4" />
          </ToolbarToggle>

          <Separator orientation="vertical" className="mx-1 h-6" />

          {/* Lists */}
          <ToolbarToggle
            pressed={editor.isActive("bulletList")}
            onPressedChange={() =>
              editor.chain().focus().toggleBulletList().run()
            }
            disabled={disabled}
            tooltip="Bullet List"
          >
            <List className="h-4 w-4" />
          </ToolbarToggle>
          <ToolbarToggle
            pressed={editor.isActive("orderedList")}
            onPressedChange={() =>
              editor.chain().focus().toggleOrderedList().run()
            }
            disabled={disabled}
            tooltip="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarToggle>

          <Separator orientation="vertical" className="mx-1 h-6" />

          {/* Block Elements */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            disabled={disabled}
            active={editor.isActive("blockquote")}
            tooltip="Blockquote"
          >
            <Quote className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            disabled={disabled}
            tooltip="Horizontal Rule"
          >
            <Minus className="h-4 w-4" />
          </ToolbarButton>

          <Separator orientation="vertical" className="mx-1 h-6" />

          {/* Links */}
          <ToolbarButton
            onClick={openLinkDialog}
            disabled={disabled}
            active={editor.isActive("link")}
            tooltip="Insert Link"
          >
            <LinkIcon className="h-4 w-4" />
          </ToolbarButton>
          {editor.isActive("link") && (
            <ToolbarButton
              onClick={() => editor.chain().focus().unsetLink().run()}
              disabled={disabled}
              tooltip="Remove Link"
            >
              <Unlink className="h-4 w-4" />
            </ToolbarButton>
          )}

          {/* Image Upload */}
          {onImageUpload && (
            <>
              <Separator orientation="vertical" className="mx-1 h-6" />
              <ToolbarButton
                onClick={triggerImageUpload}
                disabled={disabled || isUploadingImage}
                tooltip={isUploadingImage ? "Uploading..." : "Insert Image"}
              >
                {isUploadingImage ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ImageIcon className="h-4 w-4" />
                )}
              </ToolbarButton>
            </>
          )}
        </div>

        {/* Editor Content - Scrollable */}
        <ScrollArea className="h-[600px] w-full">
          <div className="w-full">
            <EditorContent editor={editor} className="w-full" />
          </div>
          <style jsx global>{`
            .ProseMirror img {
              max-width: 100%;
              height: auto;
              cursor: pointer;
              transition: all 0.2s;
              display: block;
            }
            .ProseMirror img.ProseMirror-selectednode {
              outline: 2px solid hsl(var(--primary));
              outline-offset: 2px;
            }
            /* Resize handles */
            .ProseMirror .resize-handle {
              position: absolute;
              width: 8px;
              height: 8px;
              background: hsl(var(--primary));
              border: 1px solid hsl(var(--background));
              border-radius: 50%;
              z-index: 10;
            }
            .ProseMirror .resize-handle.bottom-right {
              bottom: -4px;
              right: -4px;
              cursor: nwse-resize;
            }
            .ProseMirror .resize-handle.bottom-left {
              bottom: -4px;
              left: -4px;
              cursor: nesw-resize;
            }
            .ProseMirror .resize-handle.top-right {
              top: -4px;
              right: -4px;
              cursor: nesw-resize;
            }
            .ProseMirror .resize-handle.top-left {
              top: -4px;
              left: -4px;
              cursor: nwse-resize;
            }
          `}</style>
        </ScrollArea>

        {/* Link Dialog */}
        <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Insert Link</DialogTitle>
              <DialogDescription>
                Enter the URL for the link. It will automatically add https://
                if no protocol is specified.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  placeholder="https://example.com"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSetLink();
                    }
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setLinkDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSetLink}>
                {linkUrl ? "Apply Link" : "Remove Link"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Hidden file input for image upload */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </TooltipProvider>
  );
}
