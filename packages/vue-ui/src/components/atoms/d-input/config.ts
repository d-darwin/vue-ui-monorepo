import { TYPE } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/constant";
import styles from "./index.css?module";

export default {
  name: "DInput",
  className: "dInput",
  inputClassName: "input",
  inputContainerClassName: "inputContainer",
  labelClassName: "label",
  captionOptions: {
    type: TYPE.DANGER,
    class: styles["caption"],
  },
  captionOffset: "0.2em",
  beforeContainerClass: "beforeInput",
  afterContainerClass: "afterInput",
};
