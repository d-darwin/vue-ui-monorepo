import { Story } from "@storybook/vue3";
import DLoader from "@darwin-studio/vue-ui/src/components/atoms/d-loader";

export default {
  title: "atoms/DLoader",
  component: DLoader,
  argTypes: {
    // TODO
  },
  args: {},
};

const Template: Story = (args) => ({
  components: { DLoader },
  setup() {
    return { args };
  },
  template: `<DLoader v-bind="args" />`,
});
export const Default = Template.bind({});

const FillAvailableTemplate: Story = (args) => ({
  components: { DLoader },
  setup() {
    return { args };
  },
  template: `<DLoader v-bind="args" />`,
});
export const FillAvailable = FillAvailableTemplate.bind({});
FillAvailable.args = {
  fillAvailable: true,
};
