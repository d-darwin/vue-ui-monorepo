import type { DLoaderProps } from "@darwin-studio/vue-ui/src/components/atoms/d-loader/types";
import config from "./config";
import styles from "./index.css?module";

export const LOADER_DEFAULTS: DLoaderProps = {
  class: [styles[config.loaderClassName]],
};
