import config from "./config";

export type Tag =
  | typeof config.buttonTag
  | typeof config.routerLinkTag
  | typeof config.linkTag;
