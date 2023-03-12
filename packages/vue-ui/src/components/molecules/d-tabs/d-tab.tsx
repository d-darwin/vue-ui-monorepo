import { defineComponent, PropType, VNode } from "vue";
import type { Padding } from "@darwin-studio/ui-codegen/dist/types/padding"; // TODO: shorter path, default export ???
import type { Size } from "@darwin-studio/ui-codegen/dist/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import type { Transition } from "@darwin-studio/ui-codegen/dist/types/transition"; // TODO: shorter path, default export ???
import fontStyles from "@darwin-studio/ui-codegen/dist/styles/font.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import outlineStyles from "@darwin-studio/ui-codegen/dist/styles/outline.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import paddingStyles from "@darwin-studio/ui-codegen/dist/styles/padding.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import sizeStyles from "@darwin-studio/ui-codegen/dist/styles/size.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import transitionStyles from "@darwin-studio/ui-codegen/dist/styles/transition.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import type { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import config from "./config";
import styles from "./d-tab.css?module";

export default defineComponent({
  name: config.tabName,

  props: {
    /**
     * Plain string, VNode or HTML if props.enableHtml is true
     */
    label: {
      // TODO: rename -> content ???
      type: [String, Number, Object] as PropType<Text | VNode>,
    },
    /**
     * Pass if the component is active
     */
    active: {
      type: Boolean,
    },
    /**
     * Defines <i>id</i> attr of the component
     */
    id: {
      type: [String, Number] as PropType<Text>,
    },
    /**
     * Defines <i>id</i> attr of the corresponding DTabpanel component
     */
    tabpanelId: {
      type: [String, Number] as PropType<Text>,
    },
    /**
     * Pass true to disable <b>DTab</b> element.
     */
    disabled: {
      type: Boolean,
    },
    /**
     * Defines padding type of the component, use 'equal' if the component contains only an icon
     */
    padding: {
      type: String as PropType<Padding>,
    },
    /**
     * Defines size of the component
     */
    size: {
      type: String as PropType<Size>,
      default: SIZE.MEDIUM, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines transition type of the component
     */
    transition: {
      type: String as PropType<Transition>,
    },
    /*TODO: It is recommended to use a <button> element with the role tab for their built-in functional and accessible features instead,
       as opposed to needing to add them yourself. For controlling tab key functionality for elements with the role tab,
       it is recommended to set all non-active elements to tabindex="-1", and to set the active element to tabindex="0".
    */
    /**
     * Defines element type of the container component
     */
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.LI,
    },
    /**
     * Enables html string rendering passed in props.label.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    enableHtml: {
      type: Boolean,
    },

    /**
     * Alternative way to catch click event
     */
    whenClick: {
      type: Function as PropType<(event?: MouseEvent) => void | Promise<void>>,
    },
  },

  emits: [EVENT_NAME.CLICK],

  computed: {
    classes(): string[] {
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.size
      );
      const outlineClassName = prepareCssClassName(
        codegenConfig.TOKENS.OUTLINE.CSS_CLASS_PREFIX,
        `primary-${this.size}` // TODO: not flexible
      );
      const paddingClassName = prepareCssClassName(
        codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
        this.padding
      );
      const paddingSizeClassName = prepareCssClassName(
        codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
        `${this.padding}-${this.size}`
      );
      const sizeClassName = prepareCssClassName(
        codegenConfig.TOKENS.SIZE.CSS_CLASS_PREFIX,
        this.size
      );
      const transitionClassName = prepareCssClassName(
        codegenConfig.TOKENS.TRANSITION.CSS_CLASS_PREFIX,
        this.transition
      );

      const classes = [
        styles[config.tabClassName],
        fontStyles[fontClassName],
        paddingStyles[paddingSizeClassName],
        paddingStyles[paddingClassName],
        outlineStyles[outlineClassName],
        sizeStyles[sizeClassName],
        transitionStyles[transitionClassName],
      ];

      if (this.active) {
        classes.push(styles.active);
      }
      if (this.disabled) {
        classes.push(styles.disabled);
      }

      return classes;
    },

    bindings(): Record<
      string,
      | undefined
      | boolean
      | number
      | string
      | string[]
      | ((event: MouseEvent) => void | Promise<void>)
    > {
      return {
        id: this.id,
        tabindex: this.active ? 0 : -1,
        role: "tab",
        ["aria-selected"]: this.active || undefined,
        ["aria-controls"]: this.tabpanelId,
        class: this.classes,
        onClick: this.clickHandler,
      };
    },
  },

  methods: {
    clickHandler(event: MouseEvent): void | Promise<void> {
      if (!this.disabled) {
        /**
         * Emits on click with MouseEvent payload
         * @event click
         * @type {event: MouseEvent}
         */
        this.$emit(EVENT_NAME.CLICK, event);
        this.whenClick?.(event);
      }
    },
  },

  render(): VNode {
    const Tag = this.tag;

    if (!this.enableHtml) {
      /** @slot Use instead of props.label to fully customize content */
      return (
        <Tag {...this.bindings}>{this.$slots.default?.() || this.label}</Tag>
      );
    }

    return <Tag {...this.bindings} v-html={this.label} />;
  },
});
