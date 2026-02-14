import {
  mergeAttributes,
  Node,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";

export function ImageSkeleton() {
  return (
    <NodeViewWrapper className="tiptap-image-skeleton">
      <div className="tiptap-skeleton"></div>
    </NodeViewWrapper>
  );
}

export const TiptapImageSkeleton = Node.create({
  name: "tiptapImageSkeleton",
  group: "block",
  parseHTML() {
    return [
      {
        tag: "tiptap-image-skeleton",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["tiptap-image-skeleton", mergeAttributes(HTMLAttributes)];
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageSkeleton);
  },
});
console.log(TiptapImageSkeleton.name);
