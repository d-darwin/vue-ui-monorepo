import { defineAsyncComponent } from "vue";

const DNotificationAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "atoms/d-notification" */ "./index")
);

export { DNotificationAsync };
