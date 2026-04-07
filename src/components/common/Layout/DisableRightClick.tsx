"use client";

import { useEffect } from "react";

export default function DisableRightClick() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

    const handleCopy = (e: ClipboardEvent) => e.preventDefault();

    const handleCut = (e: ClipboardEvent) => e.preventDefault();

    const handlePaste = (e: ClipboardEvent) => e.preventDefault();

    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 - Developer Tools
      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+I or Cmd+Shift+I (Inspect Element)
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        e.key.toLowerCase() === "i"
      ) {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+J or Cmd+Shift+J (Console)
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        e.key.toLowerCase() === "j"
      ) {
        e.preventDefault();
        return false;
      }

      // Ctrl+U or Cmd+U (View Source)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "u") {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+C or Cmd+Shift+C (Inspect Element)
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        e.key.toLowerCase() === "c"
      ) {
        e.preventDefault();
        return false;
      }

      // Ctrl+C or Cmd+C (Copy)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") {
        e.preventDefault();
        return false;
      }

      // Ctrl+V or Cmd+V (Paste)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "v") {
        e.preventDefault();
        return false;
      }

      // Ctrl+X or Cmd+X (Cut)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "x") {
        e.preventDefault();
        return false;
      }

      // Ctrl+S or Cmd+S (Save)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        return false;
      }

      // Ctrl+P or Cmd+P (Print)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
        e.preventDefault();
        return false;
      }
    };

    // Disable text selection
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";

    // Add event listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCut);
    document.addEventListener("paste", handlePaste);
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      document.body.style.userSelect = "auto";
      document.body.style.webkitUserSelect = "auto";
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("paste", handlePaste);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
