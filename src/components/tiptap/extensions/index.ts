import { TiptapImageSkeleton } from "./file-skeleton";
import { CustomFileHandler } from "./file-handler";
import { ImageTiptapExtension } from "./image.extension";
import { TextAlignExtension } from "./text-align.extension";
import StarterKit from "@tiptap/starter-kit";

export const extensions = [
  StarterKit,
  TextAlignExtension,
  ImageTiptapExtension,
  TiptapImageSkeleton,
  CustomFileHandler,
];