import { defineAsyncComponent } from "vue";

const DAccordionAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "molecules/d-accordion" */ "./d-accordion")
);

export { DAccordionAsync };
