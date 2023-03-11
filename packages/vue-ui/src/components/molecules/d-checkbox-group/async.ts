import { defineAsyncComponent } from "vue";

const DCheckboxGroupAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "molecules/d-checkbox-group" */ "./index")
);

export { DCheckboxGroupAsync };
