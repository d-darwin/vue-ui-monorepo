import { TYPE } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/constant";
import styles from "./index.css?module";

export default {
  name: "DCheckbox",
  className: "dCheckbox",
  inputClassName: "input",
  value: "on",
  labelClassName: "label",
  labelInnerClassName: "labelInner",
  captionOptions: {
    type: TYPE.DANGER,
    class: styles["caption"],
  },
  captionOffset: "0.2em",
  iconContainerClassName: "iconContainer",
  iconContainerBackdropClassName: "iconContainerBackdrop",
  iconClassName: "icon",
  inputType: "checkbox",
  checkMark: "✓",
};
