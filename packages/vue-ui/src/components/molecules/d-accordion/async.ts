import { defineAsyncComponent } from "vue";

const DAccordionAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "molecules/d-accordion" */ "./index")
);

export { DAccordionAsync };
