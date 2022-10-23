import { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";

export const TAG_NAME_DEFAULTS: Record<string, TagName> = {
  DIV: "div",
  SPAN: "span",
  P: "p",
  UL: "ul",
  LI: "li",
} as const;
