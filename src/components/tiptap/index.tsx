import type { Editor } from "@tiptap/react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  ChevronDown,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Quote,
  SeparatorHorizontal,
  Strikethrough,
  Type,
  Undo2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  getActiveListDropdown,
  getActiveTypographyDropdown,
} from "./helpers/get-active-dropdown";

const extensions = [StarterKit];

function MenuBar({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        // canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        // canRedo: ctx.editor.can().chain().redo().run() ?? false,
      };
    },
  });

  const headingOptions = {
    "heading-1": {
      onSelect: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      icon: Heading1,
    },
    "heading-2": {
      onSelect: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      icon: Heading2,
    },
    "heading-3": {
      onSelect: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      icon: Heading3,
    },
    "heading-4": {
      onSelect: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      icon: Heading4,
    },
    "heading-5": {
      onSelect: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      icon: Heading5,
    },
    "heading-6": {
      onSelect: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
      icon: Heading6,
    },
    paragraph: {
      onSelect: () => editor.chain().focus().setParagraph().run(),
      icon: Type,
    },
  };

  const listOptions = {
    bulletList: {
      onSelect: () => editor.chain().focus().toggleBulletList().run(),
      icon: List,
    },
    orderedList: {
      onSelect: () => editor.chain().focus().toggleOrderedList().run(),
      icon: ListOrdered,
    },
  };
  return (
    <div className="control-group">
      <div className="button-group border border-b-0 border-zinc-600 p-1 ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"editor"} size={"editor"}>
              {getActiveTypographyDropdown({
                editorState,
                options: headingOptions,
              })}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="min-w-fit">
            {Object.values(headingOptions).map(({ icon: Icon, onSelect }) => {
              return (
                <DropdownMenuItem
                  asChild
                  onSelect={(e) => {
                    e.preventDefault();
                    onSelect();
                  }}
                >
                  <Button size={"editor"} variant={"editor"}>
                    <Icon className="text-tertiary size-5" />
                  </Button>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          size={"editor"}
          variant={"editor"}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={editorState.isBold ? "is-active" : ""}
        >
          <Bold />
        </Button>
        <Button
          size={"editor"}
          variant={"editor"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={editorState.isItalic ? "is-active" : ""}
        >
          <Italic />
        </Button>
        <Button
          size={"editor"}
          variant={"editor"}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={editorState.isStrike ? "is-active" : ""}
        >
          <Strikethrough />
        </Button>
        <Button
          size={"editor"}
          variant={"editor"}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editorState.isCodeBlock ? "is-active" : ""}
        >
          <Code />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"editor"} size={"editor"}>
              {getActiveListDropdown({
                editorState,
                options: listOptions,
              })}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="min-w-fit">
            {Object.values(listOptions).map(({ icon: Icon, onSelect }) => {
              return (
                <DropdownMenuItem
                  asChild
                  onSelect={(e) => {
                    e.preventDefault();
                    onSelect();
                  }}
                >
                  <Button size={"editor"} variant={"editor"}>
                    <Icon className="text-tertiary size-5" />
                  </Button>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant={"editor"}
          size={"editor"}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editorState.isBlockquote ? "is-active" : ""}
        >
          <Quote />
        </Button>
        <Button
          variant={"editor"}
          size={"editor"}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <SeparatorHorizontal />
        </Button>

        <Button
          variant={"editor"}
          size={"editor"}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
        >
          <Undo2 />
        </Button>
      </div>
    </div>
  );
}

export default function TipTapEditor() {
  const editor = useEditor({
    extensions,
  });
  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
