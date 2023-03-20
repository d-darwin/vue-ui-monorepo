import { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";

// TODO: naming
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
  PROGRESS: "progress";
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
  PROGRESS: "progress",
} as const;
