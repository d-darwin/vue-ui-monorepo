const TAG_NAME_DEFAULTS = {
  DIV: "div",
  SPAN: "span",
  P: "p",
} as const;

type TagName = keyof HTMLElementTagNameMap;

export { TagName, TAG_NAME_DEFAULTS };
