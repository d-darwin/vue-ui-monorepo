import { defineComponent } from "vue";
import type { VNode } from "vue";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
import type { Type } from "./types";
import { TYPE } from "./constant";
import config from "./config";
import styles from "./index.css?module";

/**
 * TODO: descr
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Plain string or VNode
     */
    content: generateProp.content(),
    /**
     * Defines colors of the component
     */
    type: generateProp.string<Type>(TYPE.NONE),
    /**
     * Defines size of the component
     */
    // TODO: fontSize and size separately ???
    font: generateProp.font(),
    /**
     * Defines container element type of the component
     */
    tag: generateProp.tag(),
  },

  computed: {
    classes(): (string | undefined)[] {
      return [config.class, styles[this.type], generateClass.font(this.font)];
    },
  },

  render(): VNode {
    const Tag = this.tag;
    /** @slot Use instead of props.label to fully customize content */
    return (
      <Tag class={this.classes}>{this.$slots.default?.() || this.content}</Tag>
    );
  },
});
