import { useCallback, useState } from "react";
import { BlockNoteEditor, BlockSchema } from "@keo88/blocknote-core-kr";
import { RiIndentDecrease, RiIndentIncrease } from "react-icons/ri";

import { ToolbarButton } from "../../../SharedComponents/Toolbar/components/ToolbarButton";
import { useEditorChange } from "../../../hooks/useEditorChange";
import { formatKeyboardShortcut } from "../../../utils";

export const NestBlockButton = <BSchema extends BlockSchema>(props: {
  editor: BlockNoteEditor<BSchema>;
  mainTooltip?: string;
}) => {
  const [canNestBlock, setCanNestBlock] = useState<boolean>();

  useEditorChange(props.editor, () => {
    setCanNestBlock(props.editor.canNestBlock());
  });

  const nestBlock = useCallback(() => {
    props.editor.focus();
    props.editor.nestBlock();
  }, [props.editor]);

  return (
    <ToolbarButton
      onClick={nestBlock}
      isDisabled={!canNestBlock}
      mainTooltip={props.mainTooltip ?? "Nest Block"}
      secondaryTooltip={formatKeyboardShortcut("Tab")}
      icon={RiIndentIncrease}
    />
  );
};

export const UnnestBlockButton = <BSchema extends BlockSchema>(props: {
  editor: BlockNoteEditor<BSchema>;
  mainTooltip?: string;
}) => {
  const [canUnnestBlock, setCanUnnestBlock] = useState<boolean>();

  useEditorChange(props.editor, () => {
    setCanUnnestBlock(props.editor.canUnnestBlock());
  });

  const unnestBlock = useCallback(() => {
    props.editor.focus();
    props.editor.unnestBlock();
  }, [props]);

  return (
    <ToolbarButton
      onClick={unnestBlock}
      isDisabled={!canUnnestBlock}
      mainTooltip={props.mainTooltip ?? "Unnest Block"}
      secondaryTooltip={formatKeyboardShortcut("Shift+Tab")}
      icon={RiIndentDecrease}
    />
  );
};
