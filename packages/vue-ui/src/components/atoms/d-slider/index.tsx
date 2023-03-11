import { defineComponent, VNode } from "vue";
import config from "./config";
import styles from "./index.css?module";

/**
 * The components renders custom <b>input</b> element with <i>type="range"</i>
 */
export default defineComponent({
  name: config.name,

  render(): VNode {
    return <div class={styles[config.className]}>TODO</div>;
  },
});
