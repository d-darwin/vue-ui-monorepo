import type { DAspectRatioProps } from "@darwin-studio/vue-ui/src/components/containers/d-aspect-ratio/types";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import config from "./config";

export const ASPECT_RATIO_DEFAULTS: DAspectRatioProps = {
  aspectRatio: config.trackAspectRatio,
  tag: TAG_NAME_DEFAULTS.LABEL,
};
