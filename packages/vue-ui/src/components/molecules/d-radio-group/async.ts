import { defineAsyncComponent } from "vue";

const DRadioGroupAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "molecules/d-radio-group" */ "./index")
);

export { DRadioGroupAsync };
