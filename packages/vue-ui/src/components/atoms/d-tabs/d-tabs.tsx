import { defineComponent, VNode } from "vue";
import config from "./config";
import styles from "./d-tabs.css?module";

export default defineComponent({
  name: config.tabsName,

  render(): VNode {
    return (
      <div class={styles[config.tabsClassName]}>{this.$slots.default?.()}</div>
    );
  },
});
