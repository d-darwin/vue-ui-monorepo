import { defineComponent, PropType, VNode } from "vue";

export default defineComponent({
  name: "DTypography",

  props: {
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
    return <button onClick={this.clickHandler}>Button</button>;
  },
});
