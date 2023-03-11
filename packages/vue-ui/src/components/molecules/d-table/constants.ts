import type { DLoaderProps } from "@darwin-studio/vue-ui/src/components/atoms/d-loader/types";

// TODO: use or remove
export const TEXT_ALIGN = {
  LEFT: "left",
  CENTER: "center",
  RIGHT: "right",
} as const;

export const LOADER_DEFAULTS: DLoaderProps = {
  fillAvailable: true,
};
