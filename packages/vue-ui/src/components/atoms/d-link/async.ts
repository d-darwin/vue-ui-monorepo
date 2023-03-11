import { defineAsyncComponent } from "vue";

const DLinkAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "atoms/d-link" */ "./index")
);

export { DLinkAsync };
