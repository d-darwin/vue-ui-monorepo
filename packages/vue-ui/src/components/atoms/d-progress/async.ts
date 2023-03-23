import { defineAsyncComponent } from "vue";

const DProgressAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "atoms/d-progress" */ "./index")
);

export { DProgressAsync };
