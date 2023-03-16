import {
  defineComponent,
  type ButtonHTMLAttributes,
  type PropType,
  type VNode,
  mergeProps,
} from "vue";
// TODO: add import order rule
// TODO: add import/index ???
import borderStyles from "@darwin-studio/ui-codegen/dist/styles/border.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import colorSchemeStyles from "@darwin-studio/ui-codegen/dist/styles/color-scheme.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import fontStyles from "@darwin-studio/ui-codegen/dist/styles/font.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import outlineStyles from "@darwin-studio/ui-codegen/dist/styles/outline.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import paddingStyles from "@darwin-studio/ui-codegen/dist/styles/padding.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import roundingStyles from "@darwin-studio/ui-codegen/dist/styles/rounding.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import sizeStyles from "@darwin-studio/ui-codegen/dist/styles/size.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import transitionStyles from "@darwin-studio/ui-codegen/dist/styles/transition.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName"; // TODO: move to common utils ???
import codegenConfig from "@darwin-studio/ui-codegen/config.json"; // TODO: move to common config ???
import { DLoaderAsync as DLoader } from "@darwin-studio/vue-ui/src/components/atoms/d-loader/async";
import type { DLoaderProps } from "@darwin-studio/vue-ui/src/components/atoms/d-loader/types";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import { LOADER_DEFAULTS } from "./constants";
import type { Tag } from "./types";
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
    label: generateProp.content(),
    /**
     * Defines appearance of the component
     */
    colorScheme: generateProp.colorScheme(), // TODO: gent defaults base on actual values, not hardcoded
    /**
     * Defines padding type of the component, use 'equal' if the component contains only an icon
     */
    padding: generateProp.padding(), // TODO: gent defaults base on actual values, not hardcoded
    /**
     * Defines corner rounding of the component
     */
    rounding: generateProp.rounding(), // TODO: gent defaults base on actual values, not hardcoded
    /**
     * Defines size of the component
     */
    // TODO: fontSize and size separately ???
    size: generateProp.size(), // TODO: gent defaults base on actual values, not hardcoded
    /**
     * Defines transition type of the component
     */
    transition: generateProp.transition(), // TODO: gent defaults base on actual values, not hardcoded
    /**
     * Pass true to prevent default click behaviour
     */
    preventDefault: Boolean,
    /**
     * Pass true to make the button disabled // TODO: test, story
     */
    disabled: Boolean,
    /**
     * Defines if DLoader element should be displayed.
     */
    loading: Boolean,
    /**
     * Pass any DLoader.props to customize it, f.e. { class: "someClass" }
     */
    loaderOptions: generateProp.options<DLoaderProps>(LOADER_DEFAULTS),
    /**
     * Pass true to make the button active // TODO: test, story
     */
    active: Boolean,
    /**
     * Enables html string rendering passed in props.label.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    enableHtml: Boolean,

    /**
     * Alternative way to catch click event
     */
    whenClick: Function as PropType<
      (event: MouseEvent) => void | Promise<void>
    >,
  },

  emits: [EVENT_NAME.CLICK],

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

      if (this.disabled) {
        // TODO: use css custom props instead?
        classes.push(styles["__disabled"]); // TODO: const
        classes.push(colorSchemeStyles["__disabled"]); // TODO: const
      }

      if (this.loading) {
        classes.push(styles["__loading"]); // TODO: const, test
      }

      if (this.active) {
        classes.push(colorSchemeStyles["__active"]); // TODO: const
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

    bindings(): ButtonHTMLAttributes {
      return {
        class: this.classes,
        onClick: this.clickHandler,
      };
    },
  },

  methods: {
    clickHandler(event: MouseEvent): void | Promise<void> {
      if (this.preventDefault) {
        event.preventDefault();
      }

      if (!this.disabled && !this.loading) {
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
        <Tag {...this.bindings}>
          {this.$slots.default?.() || this.label}
          {this.loading && (
            <DLoader
              colorScheme={this.colorScheme}
              size={this.size}
              font={this.size}
              {...mergeProps(this.loaderOptions, LOADER_DEFAULTS)}
            />
          )}
        </Tag>
      );
    }

    return <Tag {...this.bindings} v-html={this.label} />;
  },
});
