import { Story } from "@storybook/vue3";
import DCheckbox from "@darwin-studio/vue-ui/src/components/atoms/d-checkbox";
import { COLOR_SCHEME } from "@darwin-studio/vue-ui-codegen/dist/constants/color-scheme";
import { FONT } from "@darwin-studio/vue-ui-codegen/dist/constants/font";
import { ROUNDING } from "@darwin-studio/vue-ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition";

export default {
  title: "atoms/DCheckbox",
  component: DCheckbox,
  argTypes: {
    colorScheme: {
      control: { type: "select" },
      options: Object.values(COLOR_SCHEME),
    },
    rounding: {
      control: { type: "select" },
      options: Object.values(ROUNDING),
    },
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
    onChange: {
      action: "changed",
    },
    onInput: {
      action: "inputed",
    },
  },
  args: {
    checked: true,
    value: "some value",
    id: "custom-id",
    inputClass: "someCustomInputClass",
    inputAttrs: { autofocus: true },
    label: "Some label",
    labelHtml: "<b>Some <i>label</i> html</b>",
    labelFont: undefined,
    labelClass: "someCustomLabelClass",
    disabled: false,
    colorScheme: COLOR_SCHEME.SECONDARY, // TODO: don't hardcode values
    rounding: ROUNDING.MEDIUM, // TODO: don't hardcode values
    size: SIZE.TINY, // TODO: don't hardcode values
    transition: TRANSITION.FAST, // TODO: don't hardcode values
    error: "Some error string",
    errorHtml: "<b>Some <i>error</i> html</b>",
    errorFont: undefined,
    errorClass: "someCustomErrorClass",
    iconContainerClass: "someIconContainerClass",
    tag: "div",
    whenChange: (checked: boolean, value: Text) => {
      console.log("changed", checked, value);
    },
    whenInput: (value: Text | undefined) => {
      console.log("inputed", value);
    },
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

const SlotIconTemplate: Story = (args) => ({
  components: { DCheckbox },
  setup() {
    return { args };
  },
  template: `
    <DCheckbox v-bind="args">
      <template v-slot:icon><b>&#11044;</b></template>
    </DCheckbox>
  `,
});
export const SlotIcon = SlotIconTemplate.bind({});
