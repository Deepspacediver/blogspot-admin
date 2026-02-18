import Image from "@tiptap/extension-image";

export const ImageTiptapExtension = Image.extend({
  addAttributes() {
    return {
      src: {
        default: "",
      },
      fileId: {
        default: null,
      },
      width: {
        default: undefined,
      },
      height: {
        default: undefined,
      },
    };
  },
}).configure({
  resize: {
    enabled: true,
    alwaysPreserveAspectRatio: true,
    minHeight: 50,
    minWidth: 50,
  },
});
