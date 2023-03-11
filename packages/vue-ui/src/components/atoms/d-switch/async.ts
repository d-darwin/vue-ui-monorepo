import { defineAsyncComponent } from "vue";

const DSwitchAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "atoms/d-switch" */ "./index")
);

export { DSwitchAsync };
