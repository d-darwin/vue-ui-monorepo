import { TYPE } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/constant";
import { Type } from "./types";
import styles from "./index.css?module";

export default {
  name: "DProgress",
  class: styles["dProgress"],
  type: Type.linear,
  labelOptions: {
    class: styles["label"],
  },
  labelOffsetCSSPropName: "--offset", // TODO: share with css ...
  labelOffset: "2px", // TODO: share with css ...
  progressOptions: {
    role: "progressbar",
    class: styles["progress"],
    max: 100,
  },
  linearClass: styles["linear"],
  circularClass: styles["circular"],
  contentOptions: {
    class: styles["content"],
  },
  loaderContainerClass: styles["loaderContainer"],
  loaderOptions: {
    key: "loader",
    class: styles["loader"],
  },
  captionOptions: {
    type: TYPE.DANGER,
    class: styles["caption"],
  },
  captionOffsetCSSPropName: "--offset", // TODO: share with css ...
  captionOffset: "2px", // TODO: share with css ...
} as const;
