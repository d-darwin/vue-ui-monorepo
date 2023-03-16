import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";

const baseColorScheme = COLOR_SCHEME.PRIMARY;

export default {
  tabsName: "DTabs",
  tabpanelName: "DTabpanel",
  tabName: "DTab",
  tabsClassName: "dTabs",
  tablistClassName: "dTablist",
  tabClassName: "dTab",
  tabpanelClassName: "dTabpanel",
  baseColorScheme,
  outlineTokenVariantName: `${baseColorScheme}-${SIZE.MEDIUM}`, // TODO: hardcode
};
