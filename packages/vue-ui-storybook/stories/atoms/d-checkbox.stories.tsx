import { Story } from "@storybook/vue3";
import DCheckbox from "@darwin-studio/vue-ui/src/components/atoms/d-checkbox";
import { FONT } from "@darwin-studio/vue-ui-codegen/dist/constants/font";
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition";

export default {
  title: "atoms/DCheckbox",
  component: DCheckbox,
  argTypes: {
    labelFont: {
      control: { type: "select" },
      options: [undefined, ...Object.values(FONT)],
    },
    size: {
      control: { type: "select" },
      options: Object.values(SIZE),
    },
    transition: {
      control: { type: "select" },
      options: Object.values(TRANSITION),
    },
    errorFont: {
      control: { type: "select" },
      options: [undefined, ...Object.values(FONT)],
    },
  },
  args: {
    value: "some value",
    id: "custom-id",
    inputClass: "someCustomInputClass",
    inputAttrs: { autofocus: true },
    label: "Some label",
    labelHtml: "<b>Some <i>label</i> html</b>",
    labelFont: undefined,
    labelClass: "someCustomLabelClass",
    disabled: false,
    size: SIZE.MEDIUM, // TODO: don't hardcode values
    transition: TRANSITION.SLOW, // TODO: don't hardcode values
    error: "Some error string",
    errorHtml: "<b>Some <i>error</i> html</b>",
    errorFont: undefined,
    errorClass: "someCustomErrorClass",
    tag: "div",
  },
  // TODO: Actions
};

const Template: Story = (args) => ({
  components: { DCheckbox },
  setup() {
    return { args };
  },
  template: `<DCheckbox v-bind="args" />`,
});
export const Default = Template.bind({});
