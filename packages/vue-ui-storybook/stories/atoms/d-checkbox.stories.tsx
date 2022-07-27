import { Story } from "@storybook/vue3";
import DCheckbox from "@darwin-studio/vue-ui/src/components/atoms/d-checkbox";

export default {
  title: "atoms/DCheckbox",
  component: DCheckbox,
  args: {
    label: "Some label",
    id: "custom-id",
    disabled: false,
    tag: "div",
  },
};

const Template: Story = (args) => ({
  components: { DCheckbox },
  setup() {
    return { args };
  },
  template: `<DCheckbox v-bind="args" />`,
});
export const Default = Template.bind({});
