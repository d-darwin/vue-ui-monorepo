import { InputHTMLAttributes, LabelHTMLAttributes } from "vue";
import { DCaptionProps } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/types";
import { TYPE } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/constant";
import config from "./config";
import styles from "./index.css?module";

export const LABEL_DEFAULTS: LabelHTMLAttributes = {
  class: styles[config.labelClassName],
};

export const INPUT_DEFAULTS: InputHTMLAttributes = {
  type: config.inputType,
  class: styles[config.inputClassName],
};

export const CAPTION_DEFAULTS: DCaptionProps = {
  type: TYPE.DANGER,
  class: styles[config.captionClassName],
};
