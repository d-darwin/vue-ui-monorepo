import { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";

// TODO: naming
export const TAG_NAME: Partial<Record<Uppercase<TagName>, TagName>> & {
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
  DETAILS: "details";
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
  DETAILS: "details",
} as const;
