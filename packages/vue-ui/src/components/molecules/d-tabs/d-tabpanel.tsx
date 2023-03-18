import { defineComponent, type HTMLAttributes, type VNode } from "vue";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import getCommonCssClass from "@darwin-studio/vue-ui/src/utils/get-common-css-class";
import { TOKEN_NAME } from "@darwin-studio/vue-ui/src/constants/token-name";
import config from "./config";
import styles from "./d-tabpanel.css?module";

export default defineComponent({
  name: config.tabpanelName,

  props: {
    /**
     * Plain string or VNode
     */
    content: generateProp.content(),
    /**
     * Pass if the component is active
     */
    active: Boolean,
    /**
     * Defines <i>id</i> attr of the component
     */
    id: generateProp.text(), // TODO use .(() => uuid4()) ???
    /**
     * Defines <i>id</i> attr of the corresponding DTab component
     */
    tabId: generateProp.text(),
    /**
     * Defines font size of the component
     */
    font: generateProp.font(),
    /**
     * Defines padding type of the component, use 'equal' if the component contains only an icon
     */
    padding: generateProp.padding(),
    /**
     * Defines transition type of the component
     */
    transition: generateProp.transition(),
    /**
     * Defines element type of the container component
     */
    tag: generateProp.tag(),
  },

  computed: {
    classes(): (string | undefined)[] {
      return [
        styles[config.tabpanelClassName],
        getCommonCssClass(TOKEN_NAME.FONT, this.font),
        getCommonCssClass(TOKEN_NAME.OUTLINE, config.outlineTokenVariantName),
        getCommonCssClass(TOKEN_NAME.PADDING, this.padding),
        getCommonCssClass(TOKEN_NAME.PADDING, `${this.padding}-${this.font}`),
        getCommonCssClass(TOKEN_NAME.TRANSITION, this.transition),
      ];
    },

    bindings(): HTMLAttributes {
      return {
        id: this.id ? String(this.id) : undefined,
        tabindex: 0,
        role: "tabpanel",
        ["aria-labelledby"]: this.tabId ? String(this.tabId) : undefined,
        ["aria-expanded"]: this.active || undefined,
        ["aria-hidden"]: !this.active || undefined,
        hidden: !this.active || undefined,
        class: this.classes,
      };
    },
  },

  render(): VNode {
    const Tag = this.tag;
    /** @slot Use instead of props.content to fully customize content */
    return (
      <Tag {...this.bindings}>{this.$slots.default?.() || this.content}</Tag>
    );
  },
});
