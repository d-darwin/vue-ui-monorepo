import { DCaptionProps } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/types";
import { TYPE } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/constant";
import config from "@darwin-studio/vue-ui/src/components/atoms/d-switch/config";
import styles from "./index.css?module";

export const DEFAULT_VALUE = "on";

export const CAPTION_DEFAULTS: DCaptionProps = {
  type: TYPE.DANGER,
  class: styles[config.captionClassName],
};
