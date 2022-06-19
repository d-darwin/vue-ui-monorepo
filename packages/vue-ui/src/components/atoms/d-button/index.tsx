import { defineComponent, PropType, VNode } from "vue";
// TODO: add import order rule
// TODO: get @darwin-studio/vue-ui-codegen paths from config.json
// TODO: add constants/index
import type { ColorScheme } from "@darwin-studio/vue-ui-codegen/dist/types/color-scheme"; // TODO: shorter path, default export ???
import { COLOR_SCHEME } from "@darwin-studio/vue-ui-codegen/dist/constants/color-scheme"; // TODO: shorter path, default export ???
import type { Padding } from "@darwin-studio/vue-ui-codegen/dist/types/padding"; // TODO: shorter path, default export ???
import { PADDING } from "@darwin-studio/vue-ui-codegen/dist/constants/padding"; // TODO: shorter path, default export ???
import type { Size } from "@darwin-studio/vue-ui-codegen/dist/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import colorSchemeStyles from "@darwin-studio/vue-ui-codegen/dist/styles/color-scheme.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import fontStyles from "@darwin-studio/vue-ui-codegen/dist/styles/font.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import sizeStyles from "@darwin-studio/vue-ui-codegen/dist/styles/size.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import paddingStyles from "@darwin-studio/vue-ui-codegen/dist/styles/padding.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName"; // TODO: move to common utils ???
import config from "@darwin-studio/vue-ui-codegen/config.json"; // TODO: move to common config ???
import type { Text } from "@/types/text";
import styles from "./index.module.css";

export default defineComponent({
  name: "DButton",

  props: {
    /**
     * TODO: Add description
     */
    text: {
      type: [String, Number] as PropType<Text>,
    },
    html: {
      // TODO: warning
      type: String,
    },
    colorScheme: {
      type: String as PropType<ColorScheme>,
      default: COLOR_SCHEME.PRIMARY,
    },
    // TODO: fontSize and size separately ???
    size: {
      type: String as PropType<Size>,
      default: SIZE.MEDIUM,
    },
    // TODO: fontSize and size separately ???
    padding: {
      type: String as PropType<Padding>,
      default: PADDING.DEFAULT,
    },
    /*rounding: {
      type: String as PropType<Rounding>,
      default: ROUNDING.medium,
    },*/
    /*??? paddingType: {
      type: String as PropType<PaddingType>,
      default: PADDING_TYPE.default,
    },*/
    // TODO: tag -> a11y ???
    whenClick: {
      type: Function as PropType<() => void | Promise<void>>,
    },
  },

  // TODO: move to setup()
  computed: {
    classes(): string[] {
      const colorSchemeClassName = prepareCssClassName(
        config.TOKENS.COLOR_SCHEME.CSS_CLASS_PREFIX,
        this.colorScheme
      );
      // TODO: font and size separately
      const fontClassName = prepareCssClassName(
        config.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.size
      );
      const paddingClassName = prepareCssClassName(
        config.TOKENS.PADDING.CSS_CLASS_PREFIX,
        this.padding
      );
      const paddingSizeClassName = prepareCssClassName(
        config.TOKENS.PADDING.CSS_CLASS_PREFIX,
        `${this.padding}-${this.size}`
      );
      const sizeClassName = prepareCssClassName(
        config.TOKENS.SIZE.CSS_CLASS_PREFIX,
        this.size
      );

      return [
        styles.dButton,
        colorSchemeStyles[colorSchemeClassName],
        fontStyles[fontClassName],
        paddingStyles[paddingSizeClassName] ?? paddingStyles[paddingClassName],
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
