import Image from "@tiptap/extension-image";
import { CustomResizableNodeView } from "./custom-resizable-node-view";

export const ImageTiptapExtension = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fileId: {
        default: null,
      },
      textAlign: {
        default: "left",
        parseHTML: (element) =>
          element.getAttribute("data-text-align") ||
          element.style.textAlign ||
          "left",
        renderHTML: (attributes) => {
          const alignment = attributes.textAlign || "left";
          const marginMap: Record<string, string> = {
            left: "margin-right: auto; margin-left: 0;",
            center: "margin-left: auto; margin-right: auto;",
            right: "margin-left: auto; margin-right: 0;",
          };

          return {
            "data-text-align": alignment,
            style: `display: block; ${marginMap[alignment] || ""}`,
          };
        },
      },
    };
  },
  addNodeView() {
    if (
      !this.options.resize ||
      !this.options.resize.enabled ||
      typeof document === "undefined"
    ) {
      return null;
    }

    const { directions, minWidth, minHeight, alwaysPreserveAspectRatio } =
      this.options.resize;

    return ({ node, getPos, HTMLAttributes, editor }) => {
      const el = document.createElement("img");
      Object.entries(HTMLAttributes).forEach(([key, value]) => {
        if (value != null) {
          switch (key) {
            case "width":
            case "height":
              break;
            default:
              el.setAttribute(key, value);
              break;
          }
        }
      });

      el.src = HTMLAttributes.src;

      const nodeView = new CustomResizableNodeView({
        element: el,
        editor,
        node,
        getPos,
        onResize: (width, height) => {
          el.style.width = `${width}px`;
          el.style.height = `${height}px`;
        },
        onCommit: (width, height) => {
          const pos = getPos();
          if (pos === undefined) {
            return;
          }

          this.editor
            .chain()
            .setNodeSelection(pos)
            .updateAttributes(this.name, {
              width,
              height,
            })
            .run();
        },
        onUpdate: (updatedNode) => {
          if (updatedNode.type !== node.type) {
            return false;
          }

          return true;
        },
        options: {
          directions,
          min: {
            width: minWidth,
            height: minHeight,
          },
          preserveAspectRatio: alwaysPreserveAspectRatio === true,
        },
      });

      const dom = nodeView.dom as HTMLElement;

      dom.style.visibility = "hidden";
      dom.style.pointerEvents = "none";
      el.onload = () => {
        dom.style.visibility = "";
        dom.style.pointerEvents = "";
      };

      return nodeView;
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
