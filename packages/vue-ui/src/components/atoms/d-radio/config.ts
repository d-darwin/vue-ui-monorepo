import { TYPE as CAPTION_TYPE } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/constant";
import styles from "./index.css?module";

export default {
  name: "DRadio",
  className: "dRadio",
  inputClassName: "input",
  labelClassName: "label",
  labelInnerClassName: "labelInner",
  captionOptions: {
    type: CAPTION_TYPE.DANGER,
    class: styles["caption"],
  },
  captionOffset: "0.2em",
  iconContainerClassName: "iconContainer",
  iconContainerBackdropClassName: "iconContainerBackdrop",
  iconClassName: "icon",
  inputRef: "inputRef",
  buttonOptions: {
    class: styles["button"],
  },
  checkMark: "⬤",
};
