import { BlockNoteEditor, BlockSchema } from "@keo88/blocknote-core-kr";
import { useEditorContentChange } from "./useEditorContentChange";
import { useEditorSelectionChange } from "./useEditorSelectionChange";

export function useEditorChange<BSchema extends BlockSchema>(
  editor: BlockNoteEditor<BSchema>,
  callback: () => void
) {
  useEditorContentChange(editor, callback);
  useEditorSelectionChange(editor, callback);
}
