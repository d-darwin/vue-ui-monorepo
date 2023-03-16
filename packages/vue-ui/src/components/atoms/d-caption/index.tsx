import { defineComponent, type PropType, type VNode } from "vue";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font"; // TODO: shorter path, default export ???
import fontStyles from "@darwin-studio/ui-codegen/dist/styles/font.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import type { Type } from "./types";
import { TYPE } from "./constant";
import config from "./config";
import styles from "./index.css?module";

/**
 * Deprecated
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Plain string, VNode or HTML if props.enableHtml is true
     */
    label: generateProp.content(),
    /**
     * Defines colors of the component
     */
    type: {
      type: String as PropType<Type>,
      default: TYPE.NONE,
    },
    /**
     * Defines size of the component
     */
    // TODO: fontSize and size separately ???
    font: generateProp.font(FONT.SMALL),
    /**
     * Defines container element type of the component
     */
    tag: generateProp.tag(),

    /**
     * Enables html string rendering passed in props.label.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    enableHtml: Boolean,
  },

  render(): VNode {
    const Tag = this.tag;

    // TODO: use generator
    const fontClassName = prepareCssClassName(
      codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
      this.font
    );
    const classes = [
      styles[config.className],
      styles[this.type],
      fontStyles[fontClassName],
    ];

    if (!this.enableHtml) {
      /** @slot Use instead of props.label to fully customize content */
      return <Tag class={classes}>{this.$slots.default?.() || this.label}</Tag>;
    }

    return <Tag class={classes} v-html={this.label} />;
  },
});
