import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { DButton } from "@darwin-studio/vue-ui/src/components";
import config from "./config";
import styles from "./index.css?module";

export const CANCEL_BUTTON_DEFAULTS: InstanceType<typeof DButton>["$props"] = {
  label: config.cancelButtonContent,
  colorScheme: COLOR_SCHEME.SECONDARY,
  size: SIZE.MEDIUM,
  class: styles[config.footerButtonClassName],
};

export const ACCEPT_BUTTON_DEFAULTS: InstanceType<typeof DButton>["$props"] = {
  label: config.acceptButtonContent,
  size: SIZE.MEDIUM,
  class: styles[config.footerButtonClassName],
};
