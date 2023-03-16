import { defineComponent, type VNode } from "vue";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import getCommonCssClass from "@darwin-studio/vue-ui/src/utils/get-common-css-class";
import { TOKEN_NAME } from "@darwin-studio/vue-ui/src/constants/token-name";
import config from "./config";
import styles from "./index.css?module";

/**
 * The component is intended to render big text content. Use font styles from @darwin-studio/ui-codegen/dist/styles/font.css instead to render short interface copyright texts.
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Plain string, VNode or HTML if props.enableHtml is true
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
    /**
     * Enables html string rendering passed in props.content.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    // TODO: remove
    enableHtml: Boolean,
  },

  computed: {
    classes(): (string | undefined)[] {
      return [
        styles[config.className],
        getCommonCssClass(TOKEN_NAME.FONT, this.font),
      ];
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
