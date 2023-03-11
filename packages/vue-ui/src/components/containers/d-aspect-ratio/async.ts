import { defineAsyncComponent } from "vue";

const DAspectRatioAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "containers/d-aspect-ratio" */ "./index")
);

export { DAspectRatioAsync };
