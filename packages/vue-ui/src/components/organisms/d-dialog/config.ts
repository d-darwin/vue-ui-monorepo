import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import styles from "./index.css?module";

export default {
  name: "DDialog",
  class: styles["dDialog"],
  headerClass: styles["header"],
  titleClass: styles["title"],
  contentClass: styles["content"],
  footerClass: styles["footer"],
  target: "body",
  role: "dialog",
  zIndex: 1001,
  minWidth: "25%",
  maxWidth: "50%",
  minHeight: "25%",
  maxHeight: "50%",
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
