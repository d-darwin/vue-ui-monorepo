import { defineAsyncComponent } from "vue";

const DTypographyAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "containers/d-typography" */ "./index")
);

export { DTypographyAsync };
