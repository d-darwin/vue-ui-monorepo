import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding";
import { DButtonProps } from "@darwin-studio/vue-ui/src/components/atoms/d-button/types";
import config from "./config";
import styles from "./index.css?module";

export const CLOSE_BUTTON_DEFAULTS: DButtonProps = {
  label: config.closeButtonContent,
  size: SIZE.SMALL,
  padding: PADDING.EQUAL,
  class: styles[config.closeButtonClassName],
};
