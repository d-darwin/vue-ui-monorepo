import { defineComponent } from "vue";
import type { VNode } from "vue";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
import config from "./config";

/**
 * The component is intended to render big text content. Use font styles from @darwin-studio/ui-codegen/dist/styles/font.css instead to render short interface copyright texts.
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Plain string or VNode
     */
    content: generateProp.content(),
    /**
     * Defines font size of the component. By default, depends on props.size
     */
    font: generateProp.font(),
    /**
     * Defines container element type of the component
     */
    tag: generateProp.tag(),
  },

  computed: {
    classes(): (string | undefined)[] {
      return [config.class, generateClass.font(this.font)];
    },
  },

  render(): VNode {
    const Tag = this.tag;
    /** @slot Use instead of props.content to fully customize content */
    return (
      <Tag class={this.classes}>{this.$slots.default?.() || this.content}</Tag>
    );
  },
});
