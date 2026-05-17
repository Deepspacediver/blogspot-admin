import { uploadFile } from "@/api/files/fetch";
import { toast } from "sonner";
import FileHandler from "@tiptap/extension-file-handler";

export const CustomFileHandler = FileHandler.configure({
  allowedMimeTypes: [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/webp",
  ],

  onDrop: (currentEditor, files, pos) => {
    files.forEach(async (file) => {
      const historySnapshot = currentEditor.state;
      currentEditor
        .chain()
        .insertContentAt(pos, `<tiptap-image-skeleton/>`)
        .run();
      try {
        const { id, url } = await uploadFile({ file });
        // This prevents undo command from reverting to image skeleton
        // there might be better solution
        currentEditor.view.updateState(historySnapshot);
        currentEditor
          .chain()
          .insertContentAt(pos, {
            type: "image",
            attrs: {
              src: url,
              fileId: id,
            },
          })
          .focus()
          .run();
      } catch {
        toast.error("Failed to add an image. Please try again.");
        currentEditor.chain().undo().run();
        currentEditor.view.updateState(historySnapshot);

      }
    });
  },
  onPaste: (currentEditor, files, htmlContent) => {
    files.forEach(async (file) => {
      if (htmlContent) {
        return false;
      }
      const pos = currentEditor.state.selection.anchor;
      const historySnapshot = currentEditor.state;
      currentEditor
        .chain()
        .insertContentAt(pos, `<tiptap-image-skeleton/>`)
        .focus()
        .run();
      try {
        const { id, url } = await uploadFile({ file });
        currentEditor.view.updateState(historySnapshot);
        currentEditor
          .chain()
          .insertContentAt(pos, {
            type: "image",
            attrs: {
              src: url,
              fileId: id,
            },
          })
          .focus()
          .run();
      } catch {
        toast.error("Failed to add an image. Please try again.");
        currentEditor.chain().undo().run();
        currentEditor.view.updateState(historySnapshot);
      }
    });
  },
});
