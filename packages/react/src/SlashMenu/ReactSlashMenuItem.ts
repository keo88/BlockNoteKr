import {
  BaseSlashMenuItem,
  BlockSchema,
  DefaultBlockSchema,
} from "@keo88/blocknote-core-kr";

export type ReactSlashMenuItem<
  BSchema extends BlockSchema = DefaultBlockSchema
> = BaseSlashMenuItem<BSchema> & {
  group: string;
  icon: JSX.Element;
  hint?: string;
  shortcut?: string;
};
