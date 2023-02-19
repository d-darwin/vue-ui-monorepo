import { Story } from "@storybook/vue3";
import DGrid from "@darwin-studio/vue-ui/src/components/containers/d-grid";

export default {
  title: "containers/DGrid",
  component: DGrid,
  argTypes: {},
  args: {
    // TODO: use constants for breakpoint names
    colSpan: {
      xs: 4,
      sm: 2,
    },
    tag: "div",
  },
};

const SlotTemplate: Story = (args) => ({
  components: { DGrid },
  setup() {
    return { args };
  },
  template: `<DGrid v-bind="args"><b>Some slot content</b></DGrid>`,
});
export const SlotDefault = SlotTemplate.bind({});
