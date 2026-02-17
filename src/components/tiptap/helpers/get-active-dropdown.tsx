import type { ExoticComponent } from "react";

type GetActiveDropdownProps = {
  editorState: Record<PropertyKey, boolean>;
};

type GetActiveTypographyDropdownProps = GetActiveDropdownProps & {
  options: Record<string, { onSelect: () => boolean; icon: ExoticComponent }>;
};

export const getActiveTypographyDropdownItem = ({
  editorState,
  options,
}: GetActiveTypographyDropdownProps) => {
  let IconComp = options.paragraph.icon;
  if (editorState.isHeading1) {
    IconComp = options["heading-1"].icon;
    return <IconComp />;
  }
  if (editorState.isHeading2) {
    IconComp = options["heading-2"].icon;
    return <IconComp />;
  }
  if (editorState.isHeading3) {
    IconComp = options["heading-3"].icon;
    return <IconComp />;
  }
  if (editorState.isHeading4) {
    IconComp = options["heading-4"].icon;
    return <IconComp />;
  }
  if (editorState.isHeading5) {
    IconComp = options["heading-5"].icon;
    return <IconComp />;
  }
  if (editorState.isHeading6) {
    IconComp = options["heading-6"].icon;
    return <IconComp />;
  }
  return <IconComp />;
};

export const getActiveListDropdownItem = ({
  editorState,
  options,
}: GetActiveTypographyDropdownProps) => {
  let IconComp = options.bulletList.icon;
  if (editorState.isOrderedList) {
    IconComp = options.orderedList.icon;
    return <IconComp />;
  }
  return <IconComp />;
};

export const getActiveAlignDropdownItem = ({
  options,
  editorState,
}: GetActiveTypographyDropdownProps) => {
  if (editorState.isAlignCenter) {
    return <options.center.icon />;
  }
  if (editorState.isAlignRight) {
    return <options.right.icon />;
  }
  return <options.left.icon />;
};
