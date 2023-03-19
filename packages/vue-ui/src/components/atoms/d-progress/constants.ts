import { LabelHTMLAttributes, ProgressHTMLAttributes } from "vue";
import config from "./config";
import styles from "./index.css?module";

export const LABEL_DEFAULTS: LabelHTMLAttributes = {
  class: styles[config.labelClassName],
};

export const DEFAULT_VALUE = 50;
export const DEFAULT_MAX = 100;
export const PROGRESS_DEFAULTS: ProgressHTMLAttributes = {
  value: DEFAULT_VALUE,
  "aria-valuenow": DEFAULT_VALUE,
  "aria-valuemin": 0,
  "aria-valuemax": DEFAULT_MAX,
  max: DEFAULT_MAX,
  class: styles[config.progressClassName],
};
