import { defineAsyncComponent } from "vue";

const DBackdropAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "atoms/d-backdrop" */ "./index")
);

export { DBackdropAsync };
