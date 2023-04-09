import { TYPE } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/constant";
import styles from "./index.css?module";

export default {
  name: "DCheckbox",
  class: styles["dCheckbox"],
  inputClass: styles["input"],
  value: "on",
  labelClass: styles["label"],
  labelInnerClass: styles["labelInner"],
  captionOptions: {
    type: TYPE.DANGER,
    class: styles["caption"],
  },
  captionOffset: "0.2em",
  iconContainerClass: styles["iconContainer"],
  iconContainerBackdropClass: styles["iconContainerBackdrop"],
  iconClass: styles["icon"],
  inputType: "checkbox",
  checkMark: "✓",
};
