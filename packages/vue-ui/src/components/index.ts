import { App, Plugin } from "vue";

/** atoms */
import DButton from "./atoms/d-button";
import DCaption from "./atoms/d-caption";
import DCheckbox from "./atoms/d-checkbox";
import DInput from "./atoms/d-input";
import DLink from "./atoms/d-link";
import DNotification from "./atoms/d-notification";
import DRadio from "./atoms/d-radio";
import DResponsiveImage from "./atoms/d-responsive-image";
import DSwitch from "./atoms/d-switch";
import { DTabs, DTab, DTabpanel } from "./atoms/d-tabs";
import DTooltip from "./atoms/d-tooltip";
/** containers */
import DAspectRatio from "./containers/d-aspect-ratio";
// TODO import DGrid from "./containers/d-grid";
import DTypography from "./containers/d-typography";
/** molecules */
import DCheckboxGroup from "./molecules/d-checkbox-group";
import DRadioGroup from "./molecules/d-radio-group";
import DTable from "./molecules/d-table";

// TODO: add all the components
export default {
  install(Vue: App) {
    Vue.component(DButton.name, DButton);
    Vue.component(DCaption.name, DCaption);
    Vue.component(DCheckbox.name, DCheckbox);
    Vue.component(DInput.name, DInput);
    Vue.component(DLink.name, DLink);
    Vue.component(DNotification.name, DNotification);
    Vue.component(DRadio.name, DRadio);
    Vue.component(DResponsiveImage.name, DResponsiveImage);
    Vue.component(DSwitch.name, DSwitch);
    Vue.component(DTabs.name, DTabs);
    Vue.component(DTab.name, DTab);
    Vue.component(DTabpanel.name, DTabpanel);
    Vue.component(DTooltip.name, DTooltip);
    Vue.component(DAspectRatio.name, DAspectRatio);
    // TODO: Vue.component(DGrid.name, DGrid);
    Vue.component(DTypography.name, DTypography);
    Vue.component(DCheckboxGroup.name, DCheckboxGroup);
    Vue.component(DRadioGroup.name, DRadioGroup);
    Vue.component(DTable.name, DTable);
  },
} as Plugin;

export {
  DButton,
  DCaption,
  DCheckbox,
  DInput,
  DLink,
  DNotification,
  DRadio,
  DResponsiveImage,
  DSwitch,
  DTabs,
  DTab,
  DTabpanel,
  DTooltip,
  DAspectRatio,
  // TODO: DGrid
  DTypography,
  DCheckboxGroup,
  DRadioGroup,
  DTable,
};
