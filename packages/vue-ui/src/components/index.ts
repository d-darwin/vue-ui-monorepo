import type { App, Plugin } from "vue";

/** atoms **/
import DBackdrop from "./atoms/d-backdrop";
import DButton from "./atoms/d-button";
import DCaption from "./atoms/d-caption";
import DCheckbox from "./atoms/d-checkbox";
import DInput from "./atoms/d-input";
import DLink from "./atoms/d-link";
import DLoader from "./atoms/d-loader";
import DNotification from "./atoms/d-notification";
import DProgress from "./atoms/d-progress";
import DRadio from "./atoms/d-radio";
import DResponsiveImage from "./atoms/d-responsive-image";
import DSlider from "./atoms/d-slider";
import DSwitch from "./atoms/d-switch";
import DTooltip from "./atoms/d-tooltip";
/** containers **/
import DAspectRatio from "./containers/d-aspect-ratio";
import DGrid from "./containers/d-grid";
import DTypography from "./containers/d-typography";
/** molecules **/
import { DAccordion, DDetails } from "./molecules/d-accordion";
import DCheckboxGroup from "./molecules/d-checkbox-group";
import DRadioGroup from "./molecules/d-radio-group";
import DTable from "./molecules/d-table";
import { DTabs, DTab, DTabpanel } from "./molecules/d-tabs";
/** organisms **/
import DDialog from "./organisms/d-dialog";
import DDrawer from "./organisms/d-drawer";

// TODO: add all the components
// TODO: add async versions???
export default {
  install(Vue: App) {
    Vue.component(DBackdrop.name, DBackdrop);
    Vue.component(DButton.name, DButton);
    Vue.component(DCaption.name, DCaption);
    Vue.component(DCheckbox.name, DCheckbox);
    Vue.component(DInput.name, DInput);
    Vue.component(DLink.name, DLink);
    Vue.component(DLoader.name, DLoader);
    Vue.component(DNotification.name, DNotification);
    Vue.component(DProgress.name, DProgress);
    Vue.component(DRadio.name, DRadio);
    Vue.component(DResponsiveImage.name, DResponsiveImage);
    Vue.component(DSlider.name, DSlider);
    Vue.component(DSwitch.name, DSwitch);
    Vue.component(DTooltip.name, DTooltip);
    Vue.component(DAspectRatio.name, DAspectRatio);
    Vue.component(DGrid.name, DGrid);
    Vue.component(DTypography.name, DTypography);
    Vue.component(DAccordion.name, DAccordion);
    Vue.component(DDetails.name, DDetails);
    Vue.component(DCheckboxGroup.name, DCheckboxGroup);
    Vue.component(DRadioGroup.name, DRadioGroup);
    Vue.component(DTable.name, DTable);
    Vue.component(DTabs.name, DTabs);
    Vue.component(DTab.name, DTab);
    Vue.component(DTabpanel.name, DTabpanel);
    Vue.component(DDialog.name, DDialog);
    Vue.component(DDrawer.name, DDrawer);
  },
} as Plugin;

export {
  DBackdrop,
  DButton,
  DCaption,
  DCheckbox,
  DInput,
  DLink,
  DLoader,
  DNotification,
  DProgress,
  DRadio,
  DResponsiveImage,
  DSlider,
  DSwitch,
  DTooltip,
  DAspectRatio,
  DGrid,
  DTypography,
  DAccordion,
  DDetails,
  DCheckboxGroup,
  DRadioGroup,
  DTable,
  DTabs,
  DTab,
  DTabpanel,
  DDialog,
  DDrawer,
};
