import { uploadFile } from "@/api/files/fetch";
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
      const insertionRange = { from: pos - 1, to: pos + 1 };

      try {
        currentEditor
          .chain()
          .insertContentAt(pos, `<tiptap-image-skeleton/>`)
          .focus()
          .run();

        const { id, url } = await uploadFile({ file });
        currentEditor
          .chain()
          .insertContentAt(insertionRange, {
            type: "image",
            attrs: {
              src: url,
              fileId: id,
            },
            replace: true,
          })
          .focus()
          .run();
      } catch (e) {
        // TODO add toast
        console.error({ e });
        currentEditor.chain().deleteRange(insertionRange).focus().run();
      }
    });
  },
  onPaste: (currentEditor, files, htmlContent) => {
    console.dir({ files }, { depth: null });
    files.forEach(async (file) => {
      if (htmlContent) {
        return false;
      }
      const pos = currentEditor.state.selection.anchor;
      const insertionRange = { from: pos - 1, to: pos };
      try {
        currentEditor
          .chain()
          .insertContentAt(pos, `<tiptap-image-skeleton/>`)
          .focus()
          .run();
        const { id, url } = await uploadFile({ file });
        currentEditor
          .chain()
          .insertContentAt(insertionRange, {
            type: "image",
            attrs: {
              src: url,
              fileId: id,
            },
            replace: true,
          })
          .focus()
          .run();
      } catch (e) {
        console.error(e);
        currentEditor.chain().deleteRange(insertionRange).focus().run();
      }
    });
  },
});
