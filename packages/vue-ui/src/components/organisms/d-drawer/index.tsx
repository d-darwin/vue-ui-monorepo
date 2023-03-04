import { defineComponent, VNode } from "vue";
import config from "./config";
import styles from "./index.css?module";

export default defineComponent({
  name: config.name,

  props: {},

  render(): VNode {
    return <div class={styles[config.className]}></div>;
  },
});
