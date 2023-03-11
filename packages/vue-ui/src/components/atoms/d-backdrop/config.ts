import { CssPosition } from "./types";

export default {
  name: "DBackdrop",
  className: "dBackdrop",
  defaultOpacity: 0.5,
  defaultZIndex: 1000,
  defaultPosition: CssPosition.fixed,
} as const;
