import { Story } from "@storybook/vue3";
import DCheckboxGroup from "@darwin-studio/vue-ui/src/components/molecules/d-checkbox-group";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";

export default {
  title: "molecules/DCheckboxGroup",
  component: DCheckboxGroup,
  argTypes: {
    size: {
      control: { type: "select" },
      options: Object.values(SIZE),
    },
  },
  args: {
    label: "Some text content",
    size: SIZE.MEDIUM, // TODO: don't hardcode values
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
