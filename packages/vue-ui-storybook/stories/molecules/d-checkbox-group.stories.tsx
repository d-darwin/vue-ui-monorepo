import { Story } from "@storybook/vue3";
import DCheckboxGroup from "@darwin-studio/vue-ui/src/components/molecules/d-checkbox-group";

export default {
  title: "molecules/DCheckboxGroup",
  component: DCheckboxGroup,
  argTypes: {},
  args: {
    tag: "div",
  },
};

const Template: Story = (args) => ({
  components: { DCheckboxGroup },
  setup() {
    return { args };
  },
  template: `<DCheckboxGroup v-bind="args" />`,
});
export const Default = Template.bind({});
