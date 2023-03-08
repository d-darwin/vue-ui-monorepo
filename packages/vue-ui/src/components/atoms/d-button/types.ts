import config from "./config";
import DButton from "./index";

export type Tag =
  | typeof config.buttonTag
  | typeof config.routerLinkTag
  | typeof config.linkTag;

export type DButtonProps = InstanceType<typeof DButton>["$props"];
