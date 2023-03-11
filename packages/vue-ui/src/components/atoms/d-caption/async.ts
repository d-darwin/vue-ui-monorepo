import { defineAsyncComponent } from "vue";

const DCaptionAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "atoms/d-caption" */ "./index")
);

export { DCaptionAsync };
