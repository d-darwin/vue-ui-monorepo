import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding";
import type { DBackdropProps } from "@darwin-studio/vue-ui/src/components/atoms/d-backdrop/types";
import type { DButtonProps } from "@darwin-studio/vue-ui/src/components/atoms/d-button/types";
import config from "./config";
import styles from "./index.css?module";

export const BACKDROP_DEFAULTS: DBackdropProps = {};

export const CLOSE_BUTTON_DEFAULTS: DButtonProps = {
  label: config.closeButtonContent,
  size: SIZE.SMALL,
  padding: PADDING.EQUAL,
  class: styles[config.closeButtonClassName],
};

export const CANCEL_BUTTON_DEFAULTS: DButtonProps = {
  label: config.cancelButtonContent,
  colorScheme: COLOR_SCHEME.SECONDARY,
  size: SIZE.MEDIUM,
  class: styles[config.cancelButtonClassName],
};

export const ACCEPT_BUTTON_DEFAULTS: DButtonProps = {
  label: config.acceptButtonContent,
  size: SIZE.MEDIUM,
  class: styles[config.acceptButtonClassName],
};
