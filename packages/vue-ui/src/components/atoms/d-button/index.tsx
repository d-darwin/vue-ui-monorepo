import { defineComponent, PropType, VNode } from "vue";
import { Text } from "@/types/text";

export default defineComponent({
  name: "DTypography",

  props: {
    text: {
      type: [String, Number] as PropType<Text>,
    },
    html: {
      // TODO: warning
      type: String,
    },
    whenClick: {
      type: Function as PropType<() => void | Promise<void>>,
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
      return <button onClick={this.clickHandler} v-html={this.html} />;
    }

    return (
      <button onClick={this.clickHandler}>
        {this.$slots.default?.() || this.text}
      </button>
    );
  },
});
