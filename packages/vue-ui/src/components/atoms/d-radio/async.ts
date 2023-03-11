import { defineAsyncComponent } from "vue";

const DRadioAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "atoms/d-radio" */ "./index")
);

export { DRadioAsync };
