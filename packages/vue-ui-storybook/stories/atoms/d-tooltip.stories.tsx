import { Story } from "@storybook/vue3";
import DTooltip from "@darwin-studio/vue-ui/src/components/atoms/d-tooltip";

export default {
  title: "atoms/DTooltip",
  component: DTooltip,
  argTypes: {},
  args: {},
};

const Template: Story = (args) => ({
  components: { DTooltip: DTooltip },
  setup() {
    return { args };
  },
  template: `<DTooltip v-bind="args" />`,
});
export const Default = Template.bind({});

const SlotTemplate: Story = (args) => ({
  components: { DTooltip: DTooltip },
  setup() {
    return { args };
  },
  template: `<DTooltip v-bind="args">Some <b>slot</b> content</DTooltip>`,
});
export const SlotDefault = SlotTemplate.bind({});