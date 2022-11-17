import { defineComponent, PropType, VNode } from "vue";
import type { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import type { Size } from "@darwin-studio/ui-codegen/dist/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import fontStyles from "@darwin-studio/ui-codegen/dist/styles/font.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import type { Type } from "./types";
import { TYPE } from "./constant";
import config from "./config";
import styles from "./index.css?module";

/**
 * A clickable component which renders as <b>button</b> element, <b>router-link</b> component or <b>a</b> element depending on props.
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Plain string, VNode or HTML if props.enableHtml is true
     */
    label: {
      type: [String, Number, Object] as PropType<Text | VNode>,
    },
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
    size: {
      type: String as PropType<Size>,
      default: SIZE.SMALL, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines container element type of the component
     */
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.DIV,
    },
    /**
     * Enables html string rendering passed in props.label.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    enableHtml: {
      type: Boolean,
    },
  },

  render(): VNode {
    const Tag = this.tag;

    const fontClassName = prepareCssClassName(
      codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
      this.size
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
