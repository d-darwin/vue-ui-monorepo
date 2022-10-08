import { defineComponent, VNode } from "vue";
import config from "./config";
import styles from "./d-tab.css?module";

export default defineComponent({
  name: config.tabName,

  render(): VNode {
    return <div class={styles[config.tabClassName]}>{config.tabName}</div>;
  },
});
