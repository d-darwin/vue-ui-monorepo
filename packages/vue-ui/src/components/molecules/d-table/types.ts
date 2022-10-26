import { VNode } from "vue";
import { Font } from "@darwin-studio/vue-ui-codegen/dist/types/font";
import { Text } from "@darwin-studio/vue-ui/src/types/text";
import { TEXT_ALIGN } from "./constants";

export type TextAlign = typeof TEXT_ALIGN[keyof typeof TEXT_ALIGN];

// TODO: use or remove
export interface HeaderCell {
  label: Text | VNode;
  textAlign: TextAlign;
  width: string;
  font: Font;
  class: string;
  style: string;
}
