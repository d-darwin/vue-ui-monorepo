import { Story } from "@storybook/vue3";
import DRadio from "@darwin-studio/vue-ui/src/components/atoms/d-radio";
import { TYPE } from "@darwin-studio/vue-ui/src/components/atoms/d-radio/constants";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";

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
    colorScheme: {
      control: { type: "select" },
      options: Object.values(COLOR_SCHEME),
    },
    padding: {
      control: { type: "select" },
      options: Object.values(PADDING),
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
      action: "change",
    },
    onInput: {
      action: "input",
    },
    "onUpdate:checked": {
      action: "update:checked",
    },
    "onUpdate:value": {
      action: "update:value",
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
    padding: PADDING.DEFAULT, // TODO: don't hardcode values
    rounding: ROUNDING.FULL, // TODO: don't hardcode values
    size: SIZE.TINY, // TODO: don't hardcode values
    transition: TRANSITION.FAST, // TODO: don't hardcode values
    caption: "Some caption",
    captionOffset: "0.2em",
    iconContainerClass: "someIconContainerClass",
    tag: "div",
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

export const Button = Template.bind({});
Button.args = {
  type: TYPE.BUTTON,
};

// TODO: slot cases
