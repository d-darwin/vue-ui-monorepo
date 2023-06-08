import { defineAsyncComponent } from "vue";

const DAccordionAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "molecules/d-accordion" */ "./d-accordion")
);

const DDetailsAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "molecules/d-details" */ "./d-details")
);

export { DAccordionAsync, DDetailsAsync };
