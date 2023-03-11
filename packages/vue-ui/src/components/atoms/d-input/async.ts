import { defineAsyncComponent } from "vue";

const DInputAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "atoms/d-input" */ "./index")
);

export { DInputAsync };
