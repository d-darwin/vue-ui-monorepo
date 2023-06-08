import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { TAG_NAME } from "@darwin-studio/vue-ui/src/constants/tag-name";
import dTabsStyles from "./d-tabs.css?module";
import dTabStyles from "./d-tab.css?module";
import dTabpanelStyles from "./d-tabpanel.css?module";

export default {
  tabsName: "DTabs",
  tabsClass: dTabsStyles.dTabs,
  provideInjectKey: "tabsProvided",
  injectedActiveIdPath: "injection.activeId",
  colorScheme: COLOR_SCHEME.PRIMARY,
  size: SIZE.MEDIUM,

  tablistOptions: {
    role: "tablist",
    class: dTabsStyles.dTablist,
  },
  tablistTag: TAG_NAME.UL,
  tablistRef: "tablist",

  tabName: "DTab",
  tabOptions: {
    role: "tab",
    class: dTabStyles.dTab,
  },
  tabTag: TAG_NAME.LI,

  tabpanelName: "DTabpanel",
  tabpanelOptions: {
    role: "tabpanel",
    tabindex: 0,
    class: dTabpanelStyles.dTabpanel,
  },
  tabpanelTag: TAG_NAME.DIV,
};
