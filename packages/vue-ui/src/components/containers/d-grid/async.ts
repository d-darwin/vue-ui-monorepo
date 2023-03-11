import { defineAsyncComponent } from "vue";

const DGridAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "containers/d-grid" */ "./index")
);

export { DGridAsync };
