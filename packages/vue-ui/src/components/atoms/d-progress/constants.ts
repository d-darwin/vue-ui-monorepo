import {
  HTMLAttributes,
  LabelHTMLAttributes,
  ProgressHTMLAttributes,
} from "vue";
import type { DLoaderProps } from "@darwin-studio/vue-ui/src/components/atoms/d-loader/types";
import config from "./config";
import styles from "./index.css?module";

export const LABEL_DEFAULTS: LabelHTMLAttributes = {
  class: styles[config.labelClassName],
};

export const DEFAULT_MAX = 100;
export const PROGRESS_DEFAULTS: ProgressHTMLAttributes = {
  max: DEFAULT_MAX,
  class: styles[config.progressClassName],
};

export const CONTENT_DEFAULTS: HTMLAttributes = {
  class: styles[config.contentClassName],
};

export const LOADER_DEFAULTS: DLoaderProps = {
  key: "loader",
  class: styles[config.loaderClassName],
};
