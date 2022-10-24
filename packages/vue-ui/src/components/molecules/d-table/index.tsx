import { defineComponent, VNode } from "vue";
import config from "./config";
import styles from "./index.css?module";

/**
 * A clickable component which renders as <b>button</b> element, <b>router-link</b> component or <b>a</b> element depending on props.
 */
export default defineComponent({
  name: config.name,

  props: {
    // TODO: columns
    // TODO: data
    // TODO: headClassName
    // TODO: bodyClassName
  },

  render(): VNode {
    return (
      <table class={styles[config.className]}>
        <thead>TODO: thead</thead>
        <tbody>TODO: tbody</tbody>
      </table>
    );
  },
});
