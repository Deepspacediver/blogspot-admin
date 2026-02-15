import {
  mergeAttributes,
  Node,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";

export function ImageSkeleton() {
  return (
    <NodeViewWrapper className="tiptap-image-skeleton">
      <div className="animate-pulse bg-gray-200 w-52 h-60"></div>
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
