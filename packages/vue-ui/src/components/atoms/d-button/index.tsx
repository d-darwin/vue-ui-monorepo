import { defineComponent, PropType, VNode } from "vue";
// TODO: add import order rule
// TODO: add import/index ???
import type { ColorScheme } from "@darwin-studio/vue-ui-codegen/dist/types/color-scheme"; // TODO: shorter path, default export ???
import { COLOR_SCHEME } from "@darwin-studio/vue-ui-codegen/dist/constants/color-scheme"; // TODO: shorter path, default export ???
import type { Padding } from "@darwin-studio/vue-ui-codegen/dist/types/padding"; // TODO: shorter path, default export ???
import { PADDING } from "@darwin-studio/vue-ui-codegen/dist/constants/padding"; // TODO: shorter path, default export ???
import type { Rounding } from "@darwin-studio/vue-ui-codegen/dist/types/rounding"; // TODO: shorter path, default export ???
import { ROUNDING } from "@darwin-studio/vue-ui-codegen/dist/constants/rounding"; // TODO: shorter path, default export ???
import type { Size } from "@darwin-studio/vue-ui-codegen/dist/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import type { Transition } from "@darwin-studio/vue-ui-codegen/dist/types/transition"; // TODO: shorter path, default export ???
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition"; // TODO: shorter path, default export ???
import borderStyles from "@darwin-studio/vue-ui-codegen/dist/styles/border.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import colorSchemeStyles from "@darwin-studio/vue-ui-codegen/dist/styles/color-scheme.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import fontStyles from "@darwin-studio/vue-ui-codegen/dist/styles/font.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import outlineStyles from "@darwin-studio/vue-ui-codegen/dist/styles/outline.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import paddingStyles from "@darwin-studio/vue-ui-codegen/dist/styles/padding.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import roundingStyles from "@darwin-studio/vue-ui-codegen/dist/styles/rounding.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import sizeStyles from "@darwin-studio/vue-ui-codegen/dist/styles/size.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import transitionStyles from "@darwin-studio/vue-ui-codegen/dist/styles/transition.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName"; // TODO: move to common utils ???
import codegenConfig from "@darwin-studio/vue-ui-codegen/config.json"; // TODO: move to common config ???
import eventName from "@darwin-studio/vue-ui/src/constants/event-name";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import type { Tag } from "./types";
import config from "./config";
import styles from "./index.module.css";

/**
 * A clickable component which renders as <b>button</b> element, <b>router-link</b> component or <b>a</b> element depending on props.
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Plain string or HTML if props.enableHtml is true
     */
    label: {
      type: [String, Number] as PropType<Text>,
    },
    /**
     * Defines appearance of the component
     */
    colorScheme: {
      type: String as PropType<ColorScheme>,
      default: COLOR_SCHEME.PRIMARY, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines padding type of the component, use 'equal' if the component contains only an icon
     */
    padding: {
      type: String as PropType<Padding>,
      default: PADDING.DEFAULT, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines corner rounding of the component
     */
    rounding: {
      type: String as PropType<Rounding>,
      default: ROUNDING.MEDIUM, // TODO: gent defaults base on actual values, not hardcoded
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
     * Pass true to prevent default click behaviour
     */
    preventDefault: {
      type: Boolean,
    },
    // TODO: disabled ???
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

  emits: {
    [eventName.click]: null,
  },

  computed: {
    // TODO: make some helper :thinking:
    classes(): string[] {
      // TODO: border and size and colorScheme separately ???
      const borderClassName = prepareCssClassName(
        codegenConfig.TOKENS.BORDER.CSS_CLASS_PREFIX,
        `${this.colorScheme}-${this.size}`
      );
      const colorSchemeClassName = prepareCssClassName(
        codegenConfig.TOKENS.COLOR_SCHEME.CSS_CLASS_PREFIX,
        this.colorScheme
      );
      // TODO: font and size separately
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.size
      );
      // TODO: outline and size and colorScheme separately ???
      const outlineClassName = prepareCssClassName(
        codegenConfig.TOKENS.OUTLINE.CSS_CLASS_PREFIX,
        `${this.colorScheme}-${this.size}`
      );
      const paddingClassName = prepareCssClassName(
        codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
        this.padding
      );
      const paddingSizeClassName = prepareCssClassName(
        codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
        `${this.padding}-${this.size}`
      );
      const roundingClassName = prepareCssClassName(
        codegenConfig.TOKENS.ROUNDING.CSS_CLASS_PREFIX,
        this.rounding
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
        styles[config.className],
        borderStyles[borderClassName],
        colorSchemeStyles[colorSchemeClassName],
        fontStyles[fontClassName],
        outlineStyles[outlineClassName],
        paddingStyles[paddingSizeClassName],
        paddingStyles[paddingClassName],
        roundingStyles[roundingClassName],
        sizeStyles[sizeClassName],
        transitionStyles[transitionClassName],
      ];

      if (this.$attrs.disabled) {
        classes.push("__disabled");
      }

      return classes;
    },

    tag(): Tag {
      if (this.$attrs["href"]) {
        return config.linkTag;
      }

      if (this.$attrs["to"]) {
        return config.routerLinkTag;
      }

      return config.buttonTag;
    },
  },

  methods: {
    clickHandler(event: MouseEvent): void | Promise<void> {
      if (this.preventDefault) {
        event.preventDefault();
      }

      if (!this.$attrs.disabled) {
        this.whenClick?.(event);
        /**
         * Emits on click with MouseEvent payload
         *
         * @event click
         */
        this.$emit(eventName.click, event);
      }
    },
  },

  render(): VNode {
    const Tag = this.tag;
    const bindings = {
      class: this.classes,
      onClick: this.clickHandler,
    };

    if (!this.enableHtml) {
      /** @slot Use instead of props.label to fully customize content */
      return <Tag {...bindings}>{this.$slots.default?.() || this.label}</Tag>;
    }

    return <Tag {...bindings} v-html={this.label} />;
  },
});
