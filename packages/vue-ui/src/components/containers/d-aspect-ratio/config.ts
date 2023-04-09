import styles from "./index.css?module";

export default {
  name: "DAspectRatio",
  class: styles["dAspectRatio"],
  innerClass: styles["dAspectRatioInner"],
  separatorList: ["/", ":"],
  aspectRatio: "1",
} as const;
