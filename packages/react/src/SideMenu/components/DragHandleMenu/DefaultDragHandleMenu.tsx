import { BlockSchema } from "@keo88/blocknote-core-kr";

import { DragHandleMenu, DragHandleMenuProps } from "./DragHandleMenu";
import { RemoveBlockButton } from "./DefaultButtons/RemoveBlockButton";
import { BlockColorsButton } from "./DefaultButtons/BlockColorsButton";

export const DefaultDragHandleMenu = <BSchema extends BlockSchema>(
  props: DragHandleMenuProps<BSchema>
) => (
  <DragHandleMenu>
    <RemoveBlockButton {...props}>삭제</RemoveBlockButton>
    <BlockColorsButton {...props}>색상</BlockColorsButton>
  </DragHandleMenu>
);
