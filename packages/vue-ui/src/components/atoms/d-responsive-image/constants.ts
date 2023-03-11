import type { DAspectRatioProps } from "@darwin-studio/vue-ui/src/components/containers/d-aspect-ratio/types";
import config from "./config";
import styles from "./index.css?module";

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

export const ASPECT_RATIO_DEFAULTS: DAspectRatioProps = {
  class: styles[config.className],
};
