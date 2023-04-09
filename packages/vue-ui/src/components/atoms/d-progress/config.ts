import { TYPE } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/constant";
import { Type } from "./types";
import styles from "./index.css?module";

export default {
  name: "DProgress",
  className: "dProgress",
  defaultType: Type.linear, // TODO default
  labelOptions: {
    class: styles["label"],
  },
  labelOffsetCSSPropName: "--offset", // TODO: share with css ...
  defaultLabelOffset: "2px", // TODO: share with css ...  default
  progressOptions: {
    role: "progressbar",
    class: styles["progress"],
    max: 100,
  },
  linearClassName: "linear",
  circularClassName: "circular",
  contentOptions: {
    class: styles["content"],
  },
  loaderContainerClassName: "loaderContainer",
  loaderOptions: {
    key: "loader",
    class: styles["loader"],
  },
  captionOptions: {
    type: TYPE.DANGER,
    class: styles["caption"],
  },
  captionOffsetCSSPropName: "--offset", // TODO: share with css ...
  defaultCaptionOffset: "2px", // TODO: share with css ... default
} as const;
