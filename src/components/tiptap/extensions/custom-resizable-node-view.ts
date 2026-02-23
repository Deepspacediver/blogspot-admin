import type { Decoration, DecorationSource } from "@tiptap/pm/view";
import {
  ResizableNodeView,
  type ResizableNodeViewOptions,
} from "@tiptap/react";
import type { Node as PMNode } from "@tiptap/pm/model";

export class CustomResizableNodeView extends ResizableNodeView {
  constructor(args: ResizableNodeViewOptions) {
    super(args);

    this.applyAlignment();
  }

  private applyAlignment() {
    const alignment = this.node.attrs.textAlign || "left";

    const alignmentMap: Record<string, string> = {
      left: "flex-start",
      center: "center",
      right: "flex-end",
    };

    if (this.container) {
      this.container.style.justifyContent = alignmentMap[alignment];
    }
  }
  update(
    node: PMNode,
    decorations: readonly Decoration[],
    innerDecorations: DecorationSource,
  ): boolean {
    if (node.type !== this.node.type) {
      return false;
    }
    this.node = node;
    this.applyAlignment();

    if (this.onUpdate) {
      return this.onUpdate(node, decorations, innerDecorations);
    }

    return true;
  }
}
