import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";

export default {
  name: "DLink",
  className: "dLink",
  routerLinkTag: "router-link",
  linkTag: "a",
  outlineTokenVariantName: `${COLOR_SCHEME.PRIMARY}-${SIZE.MEDIUM}`, // TODO: hardcode
} as const;
