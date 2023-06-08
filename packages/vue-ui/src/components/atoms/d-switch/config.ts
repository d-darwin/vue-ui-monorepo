import { TYPE } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/constant";
import { TAG_NAME } from "@darwin-studio/vue-ui/src/constants/tag-name";
import styles from "./index.css?module";

export default {
  name: "DSwitch",
  class: styles["dSwitch"],
  inputClass: styles["input"],
  labelClass: styles["label"],
  thumbClass: styles["thumb"],
  thumbInnerClass: styles["thumbInner"],
  captionOptions: {
    type: TYPE.DANGER,
    class: styles["caption"],
  },
  captionOffset: "0.2em",
  trackOptions: {
    aspectRatio: 2.4,
    tag: TAG_NAME.LABEL,
    class: styles["track"],
  },
};
