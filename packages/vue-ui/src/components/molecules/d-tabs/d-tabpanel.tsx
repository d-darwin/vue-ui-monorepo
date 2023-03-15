import { defineComponent, HTMLAttributes, PropType, VNode } from "vue";
import type { Font } from "@darwin-studio/ui-codegen/dist/types/font"; // TODO: shorter path, default export ???
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font"; // TODO: shorter path, default export ???
import type { Padding } from "@darwin-studio/ui-codegen/dist/types/padding"; // TODO: shorter path, default export ???
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding"; // TODO: shorter path, default export ???
import type { Transition } from "@darwin-studio/ui-codegen/dist/types/transition"; // TODO: shorter path, default export ???
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition"; // TODO: shorter path, default export ???
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import fontStyles from "@darwin-studio/ui-codegen/dist/styles/font.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import outlineStyles from "@darwin-studio/ui-codegen/dist/styles/outline.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import paddingStyles from "@darwin-studio/ui-codegen/dist/styles/padding.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import transitionStyles from "@darwin-studio/ui-codegen/dist/styles/transition.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import type { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import config from "./config";
import styles from "./d-tabpanel.css?module";

export default defineComponent({
  name: config.tabpanelName,

  props: {
    /**
     * Plain string, VNode or HTML if props.enableHtml is true
     */
    content: {
      type: [String, Number, Object] as PropType<Text | VNode>,
    },
    /**
     * Pass if the component is active
     */
    active: {
      type: Boolean,
      default: false,
    },
    /**
     * Defines <i>id</i> attr of the component
     */
    id: {
      type: [String, Number] as PropType<Text>,
    },
    /**
     * Defines <i>id</i> attr of the corresponding DTab component
     */
    tabId: {
      type: [String, Number] as PropType<Text>,
    },
    /**
     * Defines font size of the component
     */
    font: {
      type: String as PropType<Font>,
      default: FONT.MEDIUM, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines padding type of the component, use 'equal' if the component contains only an icon
     */
    padding: {
      type: String as PropType<Padding>,
      default: PADDING.DEFAULT, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines transition type of the component
     */
    transition: {
      type: String as PropType<Transition>,
      default: TRANSITION.FAST, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines element type of the container component
     */
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.DIV,
    },
    /**
     * Enables html string rendering passed in props.content.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    enableHtml: {
      type: Boolean,
    },
  },

  computed: {
    classes(): string[] {
      // TODO: font and size separately
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.font
      );
      // TODO: outline and size and colorScheme separately ???
      const outlineClassName = prepareCssClassName(
        codegenConfig.TOKENS.OUTLINE.CSS_CLASS_PREFIX,
        `primary-medium` // TODO: not flexible at all
      );
      const paddingClassName = prepareCssClassName(
        codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
        this.padding
      );
      const paddingSizeClassName = prepareCssClassName(
        codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
        `${this.padding}-${this.font}` // TODO: isn't a good idea, get size from somewhere ???
      );
      const transitionClassName = prepareCssClassName(
        codegenConfig.TOKENS.TRANSITION.CSS_CLASS_PREFIX,
        this.transition
      );

      return [
        styles[config.tabpanelClassName],
        fontStyles[fontClassName],
        outlineStyles[outlineClassName],
        paddingStyles[paddingSizeClassName],
        paddingStyles[paddingClassName],
        transitionStyles[transitionClassName],
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

    if (!this.enableHtml) {
      /** @slot Use instead of props.label to fully customize content */
      return (
        <Tag {...this.bindings}>{this.$slots.default?.() || this.content}</Tag>
      );
    }

    return <Tag {...this.bindings} v-html={this.content} />;
  },
});
