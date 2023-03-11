import { defineAsyncComponent } from "vue";

const DTabsAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "molecules/d-tabs" */ "./d-tabs")
);
const DTabAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "molecules/d-tab" */ "./d-tab")
);
const DTabpanelAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "molecules/d-tabpanel" */ "./d-tabpanel")
);

export { DTabsAsync, DTabAsync, DTabpanelAsync };
