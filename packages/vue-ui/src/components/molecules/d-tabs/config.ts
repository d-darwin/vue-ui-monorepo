import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { TAG_NAME } from "@darwin-studio/vue-ui/src/constants/tag-name";
import dTabsStyles from "./d-tabs.css?module";
import dTabStyles from "./d-tab.css?module";
import dTabpanelStyles from "./d-tabpanel.css?module";

export default {
  tabsName: "DTabs",
  tabsClass: dTabsStyles.dTabs,
  colorScheme: COLOR_SCHEME.PRIMARY,

  tabName: "DTab",
  tabOptions: {
    role: "tab",
    class: dTabStyles.dTab,
  },
  tabTag: TAG_NAME.LI,

  tablistClass: dTabsStyles.dTablist,
  tabpanelName: "DTabpanel",
  tabpanelOptions: {
    role: "tabpanel",
    tabindex: 0,
    class: dTabpanelStyles.dTabpanel,
  },
};
