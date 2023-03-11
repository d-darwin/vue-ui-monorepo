import { defineAsyncComponent } from "vue";

const DDialogAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "organisms/d-dialog" */ "./index")
);

export { DDialogAsync };
