import { defineComponent, type VNode } from "vue";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import getCommonCssClass from "@darwin-studio/vue-ui/src/utils/get-common-css-class";
import { TOKEN_NAME } from "@darwin-studio/vue-ui/src/constants/token-name";
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
      return [
        styles[config.className],
        styles[this.type],
        getCommonCssClass(TOKEN_NAME.FONT, this.font),
      ];
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
