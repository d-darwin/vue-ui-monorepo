import { TYPE as CAPTION_TYPE } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/constant";
import styles from "./index.css?module";

export default {
  name: "DRadio",
  class: styles["dRadio"],
  inputClass: styles["input"],
  labelClass: styles["label"],
  labelInnerClass: styles["labelInner"],
  captionOptions: {
    type: CAPTION_TYPE.DANGER,
    class: styles["caption"],
  },
  captionOffset: "0.2em",
  iconContainerClass: styles["iconContainer"],
  iconContainerBackdropClass: styles["iconContainerBackdrop"],
  iconClass: styles["icon"],
  inputRef: "inputRef",
  buttonOptions: {
    class: styles["button"],
  },
  checkMark: "⬤",
};
