import { defineComponent, VNode } from "vue";
import { dAccordionProps as props } from "./props";
import config from "./config";
import styles from "./d-accordion.css?module";

/**
 * TODO: DAccordion
 */
export default defineComponent({
  name: config.name,

  /**
   * @props summary
   * TODO: check if there is jsdoc -> storybook
   * */
  props: props,

  render(): VNode {
    const Tag = this.tag;

    return (
      /*TODO: transition-group, keys*/
      <Tag class={styles[config.className]}>
        {this.$slots.default?.() || this.content}
      </Tag>
    );
  },
});
