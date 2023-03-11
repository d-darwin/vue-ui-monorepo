import { defineAsyncComponent } from "vue";

const DSliderAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "atoms/d-slider" */ "./index")
);

export { DSliderAsync };
