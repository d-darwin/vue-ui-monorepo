import { defineComponent, PropType, VNode } from "vue";
import type { Padding } from "@darwin-studio/vue-ui-codegen/dist/types/padding"; // TODO: shorter path, default export ???
import { PADDING } from "@darwin-studio/vue-ui-codegen/dist/constants/padding"; // TODO: shorter path, default export ???
import type { Size } from "@darwin-studio/vue-ui-codegen/dist/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import type { Transition } from "@darwin-studio/vue-ui-codegen/dist/types/transition"; // TODO: shorter path, default export ???
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition"; // TODO: shorter path, default export ???
import fontStyles from "@darwin-studio/vue-ui-codegen/dist/styles/font.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import paddingStyles from "@darwin-studio/vue-ui-codegen/dist/styles/padding.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import sizeStyles from "@darwin-studio/vue-ui-codegen/dist/styles/size.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import transitionStyles from "@darwin-studio/vue-ui-codegen/dist/styles/transition.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import codegenConfig from "@darwin-studio/vue-ui-codegen/config.json";
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import config from "./config";
import styles from "./d-tab.css?module";
import { Text } from "@/types/text";

export default defineComponent({
  name: config.tabName,

  props: {
    /**
     * Plain string, VNode or HTML if props.enableHtml is true
     */
    label: {
      type: [String, Number, Object] as PropType<Text | VNode>,
    },
    /**
     * Pass if the component is active
     */
    active: {
      type: Boolean,
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
      default: PADDING.DEFAULT, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines size of the component
     */
    // TODO: fontSize and size separately ???
    size: {
      type: String as PropType<Size>,
      default: SIZE.MEDIUM, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines transition type of the component
     */
    transition: {
      type: String as PropType<Transition>,
      default: TRANSITION.FAST, // TODO: gent defaults base on actual values, not hardcoded
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
      // TODO: font and size separately
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.size
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
      string | string[] | ((event: MouseEvent) => void | Promise<void>)
    > {
      return {
        role: "tab",
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
    // TODO: use DButton ???
    if (!this.enableHtml) {
      /** @slot Use instead of props.label to fully customize content */
      return (
        <div {...this.bindings}>{this.$slots.default?.() || this.label}</div>
      );
    }

    return <div {...this.bindings} v-html={this.label} />;
  },
});