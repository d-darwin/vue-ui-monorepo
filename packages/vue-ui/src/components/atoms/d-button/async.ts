import { defineAsyncComponent } from "vue";

const DButtonAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "atoms/d-button" */ "./index")
);

export { DButtonAsync };
