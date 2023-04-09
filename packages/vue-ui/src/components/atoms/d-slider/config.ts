import { TYPE } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/constant";
import styles from "./index.css?module";

export default {
  name: "DSlider",
  class: styles["dSlider"],
  labelOptions: {
    class: styles["label"],
  },
  labelOffset: "2px",
  inputOptions: {
    role: "slider",
    type: "range",
    min: 0,
    max: 100,
    step: 1,
    class: styles["input"],
  },
  trackOptions: {
    class: styles["track"],
  },
  captionOptions: {
    type: TYPE.DANGER,
    class: styles["caption"],
  },
  captionOffset: "2px",
};
