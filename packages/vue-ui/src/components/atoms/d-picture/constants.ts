// TODO: naming
export const SOURCE_TYPE = {
  ARRAY: "array",
  OBJECT: "object",
  STRING: "string",
} as const;

export const LOADING = {
  LAZY: "lazy",
  EAGER: "eager",
  AUTO: "auto",
} as const;

export const OBJECT_FIT = {
  CONTAIN: "contain",
  COVER: "cover",
  FILL: "fill",
  NONE: "none",
  SCALE_DOWN: "scale-down",
} as const;
