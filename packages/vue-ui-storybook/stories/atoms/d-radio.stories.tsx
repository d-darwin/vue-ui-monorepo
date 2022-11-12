import { Story } from "@storybook/vue3";
import DRadio from "@darwin-studio/vue-ui/src/components/atoms/d-radio";
import { TYPE } from "@darwin-studio/vue-ui/src/components/atoms/d-radio/constants";
import { COLOR_SCHEME } from "@darwin-studio/vue-ui-codegen/dist/constants/color-scheme";
import { FONT } from "@darwin-studio/vue-ui-codegen/dist/constants/font";
import { ROUNDING } from "@darwin-studio/vue-ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition";

export default {
  title: "atoms/DRadio",
  component: DRadio,
  argTypes: {
    type: {
      control: { type: "select" },
      options: Object.values(TYPE),
    },
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
    onChange: {
      action: "change", // TODO: why catch twice ???
    },
    onInput: {
      action: "input",
    },
  },
  args: {
    type: TYPE.BASE,
    name: "some-input-name",
    checked: false,
    value: "some value",
    id: "custom-id",
    inputClass: "someCustomInputClass",
    inputAttrs: { autofocus: true },
    label: "Some label",
    labelFont: undefined,
    labelClass: "someCustomLabelClass",
    disabled: false,
    colorScheme: COLOR_SCHEME.SECONDARY, // TODO: don't hardcode values
    rounding: ROUNDING.FULL, // TODO: don't hardcode values
    size: SIZE.TINY, // TODO: don't hardcode values
    transition: TRANSITION.FAST, // TODO: don't hardcode values
    error: "Some error string",
    errorFont: undefined,
    errorClass: "someCustomErrorClass",
    iconContainerClass: "someIconContainerClass",
    tag: "div",
    enableHtml: false,
    whenChange: (checked: boolean, value: Text) => {
      console.log("change", checked, value);
    },
    whenInput: (value: Text | undefined) => {
      console.log("input", value);
    },
  },
};

const Template: Story = (args) => ({
  components: { DRadio },
  setup() {
    return { args };
  },
  template: `<DRadio v-bind="args" />`,
});
export const Default = Template.bind({});
