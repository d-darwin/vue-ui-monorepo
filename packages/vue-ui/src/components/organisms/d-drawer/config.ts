import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding";
import styles from "./index.css?module";

export default {
  name: "DDrawer",
  class: styles["dDrawer"],
  headerClass: styles["header"],
  footerClass: styles["footer"],
  titleClass: styles["title"],
  contentClass: styles["content"],
  target: "body",
  role: "complementary",
  contentRole: "navigation",
  zIndex: 1001,
  width: "25%",
  height: "25%",
  closeButtonOptions: {
    content: "⛌",
    size: SIZE.SMALL,
    padding: PADDING.EQUAL,
    class: styles["closeButton"],
  },
} as const;
