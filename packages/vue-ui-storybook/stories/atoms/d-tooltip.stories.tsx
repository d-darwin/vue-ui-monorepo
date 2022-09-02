import { Story } from "@storybook/vue3";
import DTooltip from "@darwin-studio/vue-ui/src/components/atoms/d-tooltip";

export default {
  title: "atoms/DTooltip",
  component: DTooltip,
  argTypes: {},
  args: {},
};

const Template: Story = (args) => ({
  components: { DLink: DTooltip },
  setup() {
    return { args };
  },
  template: `<DLink v-bind="args" />`,
});
export const Default = Template.bind({});

const SlotTemplate: Story = (args) => ({
  components: { DLink: DTooltip },
  setup() {
    return { args };
  },
  template: `<DLink v-bind="args">Some <b>slot</b> content</DLink>`,
});
export const SlotDefault = SlotTemplate.bind({});
