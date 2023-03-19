import {
  HTMLAttributes,
  LabelHTMLAttributes,
  ProgressHTMLAttributes,
} from "vue";
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
