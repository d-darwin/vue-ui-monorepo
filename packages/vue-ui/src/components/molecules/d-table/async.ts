import { defineAsyncComponent } from "vue";

const DTableAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "molecules/d-table" */ "./index")
);

export { DTableAsync };
