import { defineComponent, PropType, VNode } from "vue";
// TODO: add import order rule
// TODO: get @darwin-studio/vue-ui-codegen paths from config.json
// TODO: add constants/index
import type { ColorScheme } from "@darwin-studio/vue-ui-codegen/dist/types/color-scheme"; // TODO: shorter path, default export ???
import { COLOR_SCHEME } from "@darwin-studio/vue-ui-codegen/dist/constants/color-scheme"; // TODO: shorter path, default export ???
import type { Padding } from "@darwin-studio/vue-ui-codegen/dist/types/padding"; // TODO: shorter path, default export ???
import { PADDING } from "@darwin-studio/vue-ui-codegen/dist/constants/padding"; // TODO: shorter path, default export ???
import type { Rounding } from "@darwin-studio/vue-ui-codegen/dist/types/rounding"; // TODO: shorter path, default export ???
import { ROUNDING } from "@darwin-studio/vue-ui-codegen/dist/constants/rounding"; // TODO: shorter path, default export ???
import type { Size } from "@darwin-studio/vue-ui-codegen/dist/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import borderStyles from "@darwin-studio/vue-ui-codegen/dist/styles/border.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import colorSchemeStyles from "@darwin-studio/vue-ui-codegen/dist/styles/color-scheme.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import fontStyles from "@darwin-studio/vue-ui-codegen/dist/styles/font.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import outlineStyles from "@darwin-studio/vue-ui-codegen/dist/styles/outline.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import paddingStyles from "@darwin-studio/vue-ui-codegen/dist/styles/padding.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import roundingStyles from "@darwin-studio/vue-ui-codegen/dist/styles/rounding.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import sizeStyles from "@darwin-studio/vue-ui-codegen/dist/styles/size.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName"; // TODO: move to common utils ???
import config from "@darwin-studio/vue-ui-codegen/config.json"; // TODO: move to common config ???
import type { Text } from "@/types/text";
import styles from "./index.module.css";

/**
 * TODO: Add description
 */
export default defineComponent({
  name: "DButton",

  props: {
    /**
     * TODO: Add description
     */
    text: {
      type: [String, Number] as PropType<Text>,
    },
    /**
     * TODO: Add description
     */
    html: {
      // TODO: warning
      type: String,
    },
    /**
     * TODO: Add description
     */
    colorScheme: {
      type: String as PropType<ColorScheme>,
      default: COLOR_SCHEME.PRIMARY, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * TODO: Add description
     */
    // TODO: fontSize and size separately ???
    size: {
      type: String as PropType<Size>,
      default: SIZE.MEDIUM, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * TODO: Add description
     */
    padding: {
      type: String as PropType<Padding>,
      default: PADDING.DEFAULT, // TODO: gent defaults base on actual values, not hardcoded
    },
    rounding: {
      type: String as PropType<Rounding>,
      default: ROUNDING.MEDIUM, // TODO: gent defaults base on actual values, not hardcoded
    },
    /*??? paddingType: {
      type: String as PropType<PaddingType>,
      default: PADDING_TYPE.default,
    },*/
    // TODO: tag -> a11y ???
    whenClick: {
      type: Function as PropType<() => void | Promise<void>>,
    },
  },

  // TODO: move to setup() ???
  computed: {
    classes(): string[] {
      // TODO: border and size and colorScheme separately ???
      const borderClassName = prepareCssClassName(
        config.TOKENS.BORDER.CSS_CLASS_PREFIX,
        `${this.colorScheme}-${this.size}`
      );
      const colorSchemeClassName = prepareCssClassName(
        config.TOKENS.COLOR_SCHEME.CSS_CLASS_PREFIX,
        this.colorScheme
      );
      // TODO: font and size separately
      const fontClassName = prepareCssClassName(
        config.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.size
      );
      // TODO: outline and size and colorScheme separately ???
      const outlineClassName = prepareCssClassName(
        config.TOKENS.OUTLINE.CSS_CLASS_PREFIX,
        `${this.colorScheme}-${this.size}`
      );
      const paddingClassName = prepareCssClassName(
        config.TOKENS.PADDING.CSS_CLASS_PREFIX,
        this.padding
      );
      const paddingSizeClassName = prepareCssClassName(
        config.TOKENS.PADDING.CSS_CLASS_PREFIX,
        `${this.padding}-${this.size}`
      );
      const roundingClassName = prepareCssClassName(
        config.TOKENS.ROUNDING.CSS_CLASS_PREFIX,
        this.rounding
      );
      const sizeClassName = prepareCssClassName(
        config.TOKENS.SIZE.CSS_CLASS_PREFIX,
        this.size
      );

      return [
        styles.dButton,
        borderStyles[borderClassName],
        colorSchemeStyles[colorSchemeClassName],
        fontStyles[fontClassName],
        outlineStyles[outlineClassName],
        paddingStyles[paddingSizeClassName] ?? paddingStyles[paddingClassName],
        roundingStyles[roundingClassName],
        sizeStyles[sizeClassName],
      ];
    },
  },

  methods: {
    // TODO: move to setup()
    clickHandler(): void | Promise<void> {
      // TODO: preventDefault
      // TODO: non native onClick
      this.whenClick?.();
    },
  },

  render(): VNode {
    if (this.html) {
      return (
        <button
          class={this.classes}
          onClick={this.clickHandler}
          v-html={this.html}
        />
      );
    }

    return (
      <button class={this.classes} onClick={this.clickHandler}>
        {this.$slots.default?.() || this.text}
      </button>
    );
  },
});
