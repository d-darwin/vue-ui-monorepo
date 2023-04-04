import { defineComponent, PropType, VNode } from "vue";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import config from "./config";
import styles from "./d-accordion.css?module";

/**
 * TODO
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * An array of VNodes (DDetails supposed)
     */
    content: {
      type: Array as PropType<(VNode | undefined)[]>, // TODO: specify type ???
    },
    // TODO: specific props: isSolo, someOpen

    // TODO: how to pas to the children properly???
    //  hideSummaryAfter
    //  openId\Value ???
    // TODO: common props
    //  colorScheme
    //  padding
    //  rounding
    //  size
    //  transition
    /**
     * Defines container element type of the component
     */
    tag: generateProp.tag(),

    // TODO: whenChange ???
  },

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
