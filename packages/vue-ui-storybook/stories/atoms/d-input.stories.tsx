import { Story } from "@storybook/vue3";
import DInput from "@darwin-studio/vue-ui/src/components/atoms/d-input";

export default {
  title: "atoms/DInput",
  component: DInput,
  args: {
    value: "some value",
  },
};

const Template: Story = (args) => ({
  components: { DInput },
  setup() {
    return { args };
  },
  template: `<DInput v-bind="args" />`,
});
export const Default = Template.bind({});
