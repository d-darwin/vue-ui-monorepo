import { defineComponent, PropType, VNode } from "vue";
// TODO: add import/index ???
import type { ColorScheme } from "@darwin-studio/vue-ui-codegen/dist/types/color-scheme"; // TODO: shorter path, default export ???
import { COLOR_SCHEME } from "@darwin-studio/vue-ui-codegen/dist/constants/color-scheme"; // TODO: shorter path, default export ???
import type { Size } from "@darwin-studio/vue-ui-codegen/dist/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import type { Transition } from "@darwin-studio/vue-ui-codegen/dist/types/transition"; // TODO: shorter path, default export ???
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition"; // TODO: shorter path, default export ???
import colorSchemeStyles from "@darwin-studio/vue-ui-codegen/dist/styles/color-scheme.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import fontStyles from "@darwin-studio/vue-ui-codegen/dist/styles/font.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import outlineStyles from "@darwin-studio/vue-ui-codegen/dist/styles/outline.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import sizeStyles from "@darwin-studio/vue-ui-codegen/dist/styles/size.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import transitionStyles from "@darwin-studio/vue-ui-codegen/dist/styles/transition.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";
import config from "@darwin-studio/vue-ui-codegen/config.json";
import type { Text } from "@/types/text";
import styles from "./index.module.css";

/**
 * TODO: Add description
 */
export default defineComponent({
  name: "DLink",

  // TODO: add props factory
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
    // TODO: rename transitionType ???
    transition: {
      type: String as PropType<Transition>,
      default: TRANSITION.FAST, // TODO: gent defaults base on actual values, not hardcoded
    },
    // TODO: to \ href
    whenClick: {
      type: Function as PropType<(event?: MouseEvent) => void | Promise<void>>,
    },
    preventDefault: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
  },

  // TODO: move to setup() ???
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
      // TODO: outline and size and colorScheme separately ???
      const outlineClassName = prepareCssClassName(
        config.TOKENS.OUTLINE.CSS_CLASS_PREFIX,
        `${this.colorScheme}-${this.size}`
      );
      const sizeClassName = prepareCssClassName(
        config.TOKENS.SIZE.CSS_CLASS_PREFIX,
        this.size
      );
      const transitionClassName = prepareCssClassName(
        config.TOKENS.TRANSITION.CSS_CLASS_PREFIX,
        this.transition
      );

      return [
        styles.dLink,
        colorSchemeStyles[colorSchemeClassName], // TODO: split color / backgraound color
        fontStyles[fontClassName],
        outlineStyles[outlineClassName],
        sizeStyles[sizeClassName],
        transitionStyles[transitionClassName],
      ];
    },

    // TODO: move to types
    tag(): "a" | "router-link" {
      // TODO: how to check $router presence
      if (this.$attrs["to"]) {
        return "router-link";
      }

      return "a";
    },
  },

  methods: {
    // TODO: move to setup()
    clickHandler(event: MouseEvent): void | Promise<void> {
      if (this.preventDefault) {
        event.preventDefault();
      }

      if (!this.disabled) {
        this.whenClick?.(event);
        this.$emit("click", { event });
      }
    },
  },

  render(): VNode {
    const Tag = this.tag;

    if (this.html) {
      return (
        <Tag
          class={this.classes}
          onClick={this.clickHandler}
          v-html={this.html}
        />
      );
    }

    return (
      <Tag class={this.classes} onClick={this.clickHandler}>
        {this.$slots.default?.() || this.text}
      </Tag>
    );
  },
});