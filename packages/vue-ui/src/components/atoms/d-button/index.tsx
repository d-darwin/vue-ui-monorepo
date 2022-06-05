import { defineComponent, PropType, VNode } from "vue";
import { Text } from "@/types/text";

export default defineComponent({
  name: "DTypography",

  props: {
    text: {
      type: [String, Number] as PropType<Text>,
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
    return <button onClick={this.clickHandler}>{this.text}</button>;
  },
});
