import type { DLoaderProps } from "@darwin-studio/vue-ui/src/components/atoms/d-loader/types";
import colorSchemeStyles from "@darwin-studio/ui-codegen/dist/styles/color-scheme.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import config from "./config";
import styles from "./index.css?module";

export const LOADER_DEFAULTS: DLoaderProps = {
  class: [styles[config.loaderClassName], colorSchemeStyles.__disabled],
};
