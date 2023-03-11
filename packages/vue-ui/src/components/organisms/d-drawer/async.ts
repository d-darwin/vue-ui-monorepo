import { defineAsyncComponent } from "vue";

const DDrawerAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "organisms/d-drawer" */ "./index")
);

export { DDrawerAsync };
