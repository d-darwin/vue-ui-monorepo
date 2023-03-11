import { defineAsyncComponent } from "vue";

const DTooltipAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "atoms/d-tooltip" */ "./index")
);

export { DTooltipAsync };
