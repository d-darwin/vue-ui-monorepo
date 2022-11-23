import { Story } from "@storybook/vue3";
import DCheckboxGroup from "@darwin-studio/vue-ui/src/components/molecules/d-checkbox-group";
import DCheckbox from "@darwin-studio/vue-ui/src/components/atoms/d-checkbox";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";

export default {
  title: "molecules/DCheckboxGroup",
  component: DCheckboxGroup,
  argTypes: {
    labelFont: {
      control: { type: "select" },
      options: [undefined, ...Object.values(FONT)],
    },
    errorFont: {
      control: { type: "select" },
      options: [undefined, ...Object.values(FONT)],
    },
    size: {
      control: { type: "select" },
      options: Object.values(SIZE),
    },
  },
  args: {
    label: "Some text content",
    labelFont: undefined,
    labelClass: "someCustomLabelClass",
    items: [
      <DCheckbox label={"checkbox 1"} />,
      <DCheckbox label={"checkbox 2"} />,
      <DCheckbox label={"checkbox 3"} />,
    ],
    error: "Some error string",
    errorFont: undefined,
    errorClass: "someCustomErrorClass",
    size: SIZE.MEDIUM, // TODO: don't hardcode values
    tag: "fieldset",
    enableHtml: false,
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
