import type { DButtonProps } from "@darwin-studio/vue-ui/src/components/atoms/d-button/types";
import { DCaptionProps } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/types";
import { TYPE as CAPTION_TYPE } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/constant";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import config from "./config";
import styles from "./index.css?module";

export const TYPE = {
  BASE: "base",
  BUTTON: "button",
} as const;
export const BASE_COLOR_SCHEME = COLOR_SCHEME.SECONDARY; // TODO: don't use hardcoded values
export const BUTTON_DEFAULTS: DButtonProps = {
  class: styles[config.buttonClass],
};
export const CAPTION_DEFAULTS: DCaptionProps = {
  type: CAPTION_TYPE.DANGER,
  class: styles[config.captionClassName],
};
