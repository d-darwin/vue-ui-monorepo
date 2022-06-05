import { defineComponent, PropType, VNode } from "vue";
import { Size } from "@darwin-studio/vue-ui-codegen/build/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/vue-ui-codegen/build/constants/size"; // TODO: shorter path, default export ???
import { Text } from "@/types/text";
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";
import config from "@darwin-studio/vue-ui-codegen/config.json";
import styles from "./index.module.css";

export default defineComponent({
  name: "DButton",

  props: {
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
    // TODO: tag ???
    whenClick: {
      type: Function as PropType<() => void | Promise<void>>,
    },
  },

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
    clickHandler(): void | Promise<void> {
      // TODO: preventDefault
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
