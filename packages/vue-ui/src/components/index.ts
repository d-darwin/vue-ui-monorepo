import { App, Plugin } from "vue";

import DButton from "./atoms/d-button";
import DCheckbox from "./atoms/d-checkbox";
import DInput from "./atoms/d-input";
import DLink from "./atoms/d-link";
import DResponsiveImage from "./atoms/d-responsive-image";
import { DTabs, DTab, DTabpanel } from "./atoms/d-tabs";
import DTooltip from "./atoms/d-tooltip";
import DAspectRatio from "./containers/d-aspect-ratio";
import DTypography from "./containers/d-typography";
import DTable from "./molecules/d-table";

export default {
  install(Vue: App) {
    Vue.component(DButton.name, DButton);
    Vue.component(DCheckbox.name, DCheckbox);
    Vue.component(DInput.name, DInput);
    Vue.component(DLink.name, DLink);
    Vue.component(DResponsiveImage.name, DResponsiveImage);
    Vue.component(DTabs.name, DTabs);
    Vue.component(DTab.name, DTab);
    Vue.component(DTabpanel.name, DTabpanel);
    Vue.component(DTooltip.name, DTooltip);
    Vue.component(DAspectRatio.name, DAspectRatio);
    Vue.component(DTypography.name, DTypography);
    Vue.component(DTable.name, DTable);
  },
} as Plugin;

export {
  DButton,
  DCheckbox,
  DInput,
  DLink,
  DResponsiveImage,
  DTabs,
  DTab,
  DTabpanel,
  DTooltip,
  DAspectRatio,
  DTypography,
  DTable,
};
