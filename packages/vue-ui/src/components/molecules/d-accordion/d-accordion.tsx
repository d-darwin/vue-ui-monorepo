import { defineComponent } from "vue";
import type { VNode } from "vue";
import { dAccordionProps as props } from "./props";
import config from "./config";
import { dAccordionSetup } from "./setup";

/**
 * Renders an accordion using <b>DDetails</b> components.
 */
export default defineComponent({
  name: config.name,

  props,

  setup(props) {
    dAccordionSetup(props);
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
