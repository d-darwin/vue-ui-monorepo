import { defineAsyncComponent } from "vue";

const DResponsiveImageAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "atoms/d-responsive-image" */ "./index")
);

export { DResponsiveImageAsync };
