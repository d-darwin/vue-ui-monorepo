import { defineAsyncComponent } from "vue";

const DCheckboxAsync = defineAsyncComponent(
  () => import(/* webpackChunkName: "atoms/d-checkbox" */ "./index")
);

export { DCheckboxAsync };
