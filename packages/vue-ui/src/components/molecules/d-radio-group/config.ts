import { TYPE } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/constant";
import styles from "./index.css?module";

export default {
  name: "DRadioGroup",
  className: "dRadioGroup",
  labelClassName: "label",
  radioClassName: "radio",
  captionOptions: {
    type: TYPE.DANGER,
    class: styles["caption"],
  },
  captionOffset: "0.2em",
} as const;
