import { TYPE } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/constant";
import styles from "./index.css?module";

export default {
  name: "DInput",
  class: styles["dInput"],
  inputClass: styles["input"],
  inputContainerClass: styles["inputContainer"],
  labelClass: styles["label"],
  captionOptions: {
    type: TYPE.DANGER,
    class: styles["caption"],
  },
  captionOffset: "0.2em",
  beforeContainerClass: styles["beforeInput"],
  afterContainerClass: styles["afterInput"],
};
