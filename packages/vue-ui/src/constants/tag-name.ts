import { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";

export const TAG_NAME_DEFAULTS: Partial<Record<Uppercase<TagName>, TagName>> & {
  DIV: "div";
  SPAN: "span";
  P: "p";
  UL: "ul";
  LI: "li";
  FIELDSET: "fieldset";
  ASIDE: "aside";
  NAV: "nav";
  DIALOG: "dialog";
  LABEL: "label";
} = {
  DIV: "div",
  SPAN: "span",
  P: "p",
  UL: "ul",
  LI: "li",
  FIELDSET: "fieldset",
  ASIDE: "aside",
  NAV: "nav",
  DIALOG: "dialog",
  LABEL: "label",
} as const;
