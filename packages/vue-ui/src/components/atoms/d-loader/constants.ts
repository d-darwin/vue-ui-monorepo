import {
  CssPosition,
  DBackdropProps,
} from "@darwin-studio/vue-ui/src/components/atoms/d-backdrop/types";
import config from "./config";
import styles from "./index.css?module";

export const BACKDROP_DEFAULTS: DBackdropProps = {
  key: "backdrop",
  class: styles[config.backdropClassName],
  position: CssPosition.absolute,
};
