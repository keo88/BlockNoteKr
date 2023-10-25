import {
  BlockNoteEditor,
  BlockSchema,
  DefaultProps,
  PartialBlock,
} from "@keo88/blocknote-core-kr";
import { useCallback, useMemo } from "react";
import { IconType } from "react-icons";
import {
  RiAlignCenter,
  RiAlignJustify,
  RiAlignLeft,
  RiAlignRight,
} from "react-icons/ri";

import { ToolbarButton } from "../../../SharedComponents/Toolbar/components/ToolbarButton";
import { useSelectedBlocks } from "../../../hooks/useSelectedBlocks";

type TextAlignment = DefaultProps["textAlignment"];

const icons: Record<TextAlignment, IconType> = {
  left: RiAlignLeft,
  center: RiAlignCenter,
  right: RiAlignRight,
  justify: RiAlignJustify,
};

export const TextAlignButton = <BSchema extends BlockSchema>(props: {
  editor: BlockNoteEditor<BSchema>;
  textAlignment: TextAlignment;
  mainTooltip?: string;
}) => {
  const selectedBlocks = useSelectedBlocks(props.editor);

  const textAlignment = useMemo(() => {
    const block = selectedBlocks[0];

    if ("textAlignment" in block.props) {
      return block.props.textAlignment as TextAlignment;
    }

    return;
  }, [selectedBlocks]);

  const toolTip = useMemo(() => {
    if (props.mainTooltip) {
      return props.mainTooltip;
    }

    return (
      props.textAlignment === "justify"
        ? "Justify Text"
        : "Align Text " +
          props.textAlignment.slice(0, 1).toUpperCase() +
          props.textAlignment.slice(1)
    );
  }, [props]);

  const setTextAlignment = useCallback(
    (textAlignment: TextAlignment) => {
      props.editor.focus();

      for (const block of selectedBlocks) {
        props.editor.updateBlock(block, {
          props: { textAlignment: textAlignment },
        } as PartialBlock<BSchema>);
      }
    },
    [props.editor, selectedBlocks]
  );

  const show = useMemo(() => {
    return !!selectedBlocks.find((block) => "textAlignment" in block.props);
  }, [selectedBlocks]);

  if (!show) {
    return null;
  }

  return (
    <ToolbarButton
      onClick={() => setTextAlignment(props.textAlignment)}
      isSelected={textAlignment === props.textAlignment}
      mainTooltip={toolTip}
      icon={icons[props.textAlignment]}
    />
  );
};
