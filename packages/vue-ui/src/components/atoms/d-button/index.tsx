import { defineComponent, PropType, VNode } from "vue";
import type { Size } from "@darwin-studio/vue-ui-codegen/build/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/vue-ui-codegen/build/constants/size"; // TODO: shorter path, default export ???
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";
import config from "@darwin-studio/vue-ui-codegen/config.json";
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
    size: {
      type: String as PropType<Size>,
      default: SIZE.MEDIUM,
    },
    /*colorScheme: {
      type: String as PropType<ColorScheme>,
      default: COLOR_SCHEME.primary,
    },*/
    /*rounding: {
      type: String as PropType<Rounding>,
      default: ROUNDING.medium,
    },*/
    /*??? padding: {
      type: String as PropType<Padding>,
      default: PADDING.default,
    },*/
    // TODO: tag -> a11y ???
    whenClick: {
      type: Function as PropType<() => void | Promise<void>>,
    },
  },

  // TODO: move to setup()
  computed: {
    classes(): string[] {
      const sizeClassName = prepareCssClassName(
        config.TOKENS.SIZE.CSS_CLASS_PREFIX,
        this.size
      );
      return [styles.dButton, styles[sizeClassName]];
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
