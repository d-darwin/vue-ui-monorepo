import { defineComponent, ref, provide } from "vue";
import type { VNode, Ref } from "vue";
import type { DAccordionProvided } from "./types";
import { dAccordionProps as props } from "./props";
import config from "./config";

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
      config.provideInjectKey,
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
      <Tag class={config.class}>
        {this.$slots.default
          ? /** @slot An alternative way to add DDetail components */
            this.$slots.default?.()
          : this.content}
      </Tag>
    );
  },
});
