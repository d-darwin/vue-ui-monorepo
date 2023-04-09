import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding";
import styles from "./index.css?module";

export default {
  name: "DDrawer",
  className: "dDrawer",
  headerClassName: "header",
  footerClassName: "footer",
  titleClassName: "title",
  contentClassName: "content",
  defaultTarget: "body",
  defaultRole: "complementary",
  defaultContentRole: "navigation",
  defaultZIndex: 1001,
  defaultWidth: "25%",
  defaultHeight: "25%",
  closeButtonOptions: {
    content: "⛌",
    size: SIZE.SMALL,
    padding: PADDING.EQUAL,
    class: styles["closeButton"],
  },
} as const;
