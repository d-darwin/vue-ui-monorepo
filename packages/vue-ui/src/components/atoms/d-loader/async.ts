import { defineAsyncComponent } from "vue";

const DLoaderAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "atoms/d-loader" */ "./index")
);

export { DLoaderAsync };
