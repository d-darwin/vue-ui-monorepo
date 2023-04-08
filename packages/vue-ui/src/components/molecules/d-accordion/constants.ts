import { HTMLAttributes } from "vue";
import config from "./config";
import styles from "./d-details.css?module";

export const SUMMARY_DEFAULTS: HTMLAttributes & { key: string } = {
  key: "summary",
  class: styles[config.summaryClassName],
};

export const CONTENT_DEFAULTS: HTMLAttributes & { key: string; ref: string } = {
  key: "content",
  ref: config.contentRef,
  class: styles[config.contentClassName],
};

export const PROVIDE_INJECT_KEY = "commonProps";
