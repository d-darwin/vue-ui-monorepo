import { CssPosition } from "@darwin-studio/vue-ui/src/components/atoms/d-backdrop/types";
import styles from "./index.css?module";

export default {
  name: "DLoader",
  class: styles["dLoader"],
  wrapperClass: styles["wrapper"],
  backdropOptions: {
    key: "backdrop",
    class: styles["backdrop"],
    position: CssPosition.absolute,
  },
  key: "loader",
  animationDuration: "650ms",
  zIndex: 1001,
  content: "☯",
} as const;
