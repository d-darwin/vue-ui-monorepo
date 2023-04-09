import { CssPosition } from "@darwin-studio/vue-ui/src/components/atoms/d-backdrop/types";
import styles from "./index.css?module";

export default {
  name: "DLoader",
  className: "dLoader",
  wrapperClassName: "wrapper",
  backdropClassName: "",
  backdropOptions: {
    key: "backdrop",
    class: styles["backdrop"],
    position: CssPosition.absolute,
  },
  key: "loader",
  defaultAnimationDuration: "650ms",
  defaultZIndex: 1001,
  defaultContent: "☯",
} as const;
