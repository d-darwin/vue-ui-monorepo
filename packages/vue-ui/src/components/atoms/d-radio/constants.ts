import type { DButtonProps } from "@darwin-studio/vue-ui/src/components/atoms/d-button/types";
import config from "./config";
import styles from "./index.css?module";

export const TYPE = {
  BASE: "base",
  BUTTON: "button",
} as const;
export const BASE_COLOR_SCHEME = "secondary"; // TODO: don't use hardcoded values
export const BUTTON_DEFAULTS: DButtonProps = {
  class: styles[config.buttonClass],
};
