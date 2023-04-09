import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import styles from "./index.css?module";

export default {
  name: "DDialog",
  className: "dDialog",
  headerClassName: "header",
  titleClassName: "title",
  contentClassName: "content",
  footerClassName: "footer",
  defaultTarget: "body", // TODO: rename -> no "default"
  defaultRole: "dialog", // TODO: rename -> no "default"
  defaultZIndex: 1001, // TODO: rename -> no "default"
  defaultMinWidth: "25%", // TODO: rename -> no "default"
  defaultMaxWidth: "25%", // TODO: rename -> no "default"
  defaultMinHeight: "25%", // TODO: rename -> no "default"
  defaultMaxHeight: "25%", // TODO: rename -> no "default"
  closeButtonOptions: {
    content: "⛌",
    size: SIZE.SMALL,
    padding: PADDING.EQUAL,
    class: styles["closeButton"],
  },
  cancelButtonOptions: {
    content: "🛇",
    colorScheme: COLOR_SCHEME.SECONDARY,
    size: SIZE.MEDIUM,
    class: styles["cancelButton"],
  },
  acceptButtonOptions: {
    content: "🗸",
    size: SIZE.MEDIUM,
    class: styles["acceptButton"],
  },
};
