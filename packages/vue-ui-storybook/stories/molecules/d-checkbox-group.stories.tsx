import { Story } from "@storybook/vue3";
import DCheckboxGroup from "@darwin-studio/vue-ui/src/components/molecules/d-checkbox-group";
import DCheckbox from "@darwin-studio/vue-ui/src/components/atoms/d-checkbox";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";

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
    colorScheme: {
      control: { type: "select" },
      options: Object.values(COLOR_SCHEME),
    },
    rounding: {
      control: { type: "select" },
      options: Object.values(ROUNDING),
    },
    size: {
      control: { type: "select" },
      options: Object.values(SIZE),
    },
    transition: {
      control: { type: "select" },
      options: Object.values(TRANSITION),
    },
  },
  args: {
    label: "Some text content",
    labelFont: undefined,
    labelClass: "someCustomLabelClass",
    error: "Some error string",
    errorFont: undefined,
    errorClass: "someCustomErrorClass",
    disabled: false,
    colorScheme: COLOR_SCHEME.SECONDARY, // TODO: don't hardcode values
    rounding: ROUNDING.MEDIUM, // TODO: don't hardcode values
    size: SIZE.TINY, // TODO: don't hardcode values
    transition: TRANSITION.FAST, // TODO: don't hardcode values
    tag: "fieldset",
    enableHtml: false,
  },
};

const Template: Story = (args) => ({
  components: { DCheckboxGroup },
  setup() {
    return { args };
  },
  computed: {
    items() {
      return [
        <DCheckbox label={"checkbox 1"} />,
        <DCheckbox label={"checkbox 2"} />,
        <DCheckbox label={"checkbox 3"} />,
      ];
    },
  },
  template: `<DCheckboxGroup v-bind="args" :items="items" />`,
});
export const Default = Template.bind({});
