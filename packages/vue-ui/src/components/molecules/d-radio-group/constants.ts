import type { DCaptionProps } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/types";
import { TYPE as CAPTION_TYPE } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/constant";
import config from "./config";
import styles from "./index.css?module";

export const CAPTION_DEFAULTS: DCaptionProps = {
  type: CAPTION_TYPE.DANGER,
  class: styles[config.captionClassName],
};
