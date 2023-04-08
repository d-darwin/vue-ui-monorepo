import { defineComponent, ref, provide } from "vue";
import type { VNode, Ref } from "vue";
import { dAccordionProps as props } from "./props";
import config from "./config";
import { PROVIDE_INJECT_KEY } from "./constants";
import type { DAccordionProvided } from "./types";
import styles from "./d-accordion.css?module";

/**
 * TODO: DAccordion
 */
export default defineComponent({
  name: config.name,

  /**
   * @prop colorScheme
   * TODO: check if there is jsdoc -> storybook
   * */
  props,

  setup(props) {
    provide<Ref<DAccordionProvided>>(
      PROVIDE_INJECT_KEY,
      ref({
        hideSummaryAfter: props.hideSummaryAfter,
        colorScheme: props.colorScheme,
        padding: props.padding,
        rounding: props.rounding,
        size: props.size,
        transition: props.transition,
      })
    );
  },

  render(): VNode {
    const Tag = this.tag;

    return (
      /*TODO: transition-group, keys*/
      <Tag class={styles[config.className]}>
        {this.$slots.default
          ? /** @slot An alternative way to add DDetail components */
            this.$slots.default?.()
          : this.content}
      </Tag>
    );
  },
});
