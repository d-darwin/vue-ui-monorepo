import styles from "./index.css?module";

export default {
  name: "DTooltip",
  class: styles["dTooltip"],
  targetClass: styles["target"],
  contentClass: styles["content"],
  throttleDuration: 100,
  containerRef: "containerRef",
  contentRef: "contentRef",
};
