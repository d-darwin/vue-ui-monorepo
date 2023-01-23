import { defineComponent, PropType, VNode } from "vue";
import fontStyles from "@darwin-studio/ui-codegen/dist/styles/font.css?module"; // TODO: module, common style ???
import type { Font } from "@darwin-studio/ui-codegen/dist/types/font"; // TODO: shorter path, default export ???
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font"; // TODO: shorter path, default export ???
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import type { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name"; // TODO: fix relative path
import config from "./config";
import styles from "./index.css?module";
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";

// TODO
export default defineComponent({
  name: config.name,

  computed: {
    classes(): string[] {
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.font
      );
      return [styles[config.className], fontStyles[fontClassName]];
    },
  },

  props: {
    /**
     * Plain string, VNode or HTML if props.enableHtml is true
     */
    content: {
      type: [String, Number, Object] as PropType<Text | VNode>,
    },
    /**
     * Defines font size of the component. By default, depends on props.size
     */
    font: {
      type: String as PropType<Font>,
      default: FONT.MEDIUM,
    },
    /**
     * Defines container element type of the component
     */
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.DIV,
    },
    /**
     * Enables html string rendering passed in props.label and props.error.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    enableHtml: {
      type: Boolean,
    },
  },

  render(): VNode {
    const Tag = this.tag;

    if (!this.enableHtml) {
      /** @slot Use instead of props.content to fully customize content */
      return (
        <Tag class={this.classes}>
          {this.$slots.default?.() || this.content}
        </Tag>
      );
    }

    return <Tag class={this.classes} v-html={this.content} />;
  },
});
