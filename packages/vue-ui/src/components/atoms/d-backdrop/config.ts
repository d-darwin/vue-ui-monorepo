import { CssPosition } from "./types";
import styles from "./index.css?module";

export default {
  name: "DBackdrop",
  class: styles.dBackdrop,
  opacity: 0.5,
  zIndex: 1000,
  position: CssPosition.fixed,
} as const;
