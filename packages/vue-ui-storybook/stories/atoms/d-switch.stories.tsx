import { Story } from "@storybook/vue3";
import DSwitch from "@darwin-studio/vue-ui/src/components/atoms/d-switch";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";

export default {
  title: "atoms/DSwitch",
  component: DSwitch,
  argTypes: {
    font: {
      control: { type: "select" },
      options: [undefined, ...Object.values(FONT)],
    },
    labelFont: {
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
    id: "",
    checked: false,
    values: {
      falsy: "falsy",
      truthy: "truthy",
    },
    labels: {
      falsy: "Off",
      truthy: "On",
    },
    inputClass: "customInputClass",
    labelFont: undefined,
    labelClass: "customLabelClass",
    disabled: false,
    colorScheme: COLOR_SCHEME.PRIMARY, // TODO: don't hardcode values
    rounding: ROUNDING.FULL, // TODO: don't hardcode values
    size: SIZE.TINY, // TODO: don't hardcode values
    transition: TRANSITION.FAST, // TODO: don't hardcode values
    font: undefined,
    caption: "Some caption",
    captionOffset: "0.2em",
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
  components: { DSwitch },
  setup() {
    return { args };
  },
  template: `<DSwitch v-bind="args" />`,
});

export const Default = Template.bind({});

const SlotCaptionTemplate: Story = (args) => ({
  components: { DSwitch },
  setup() {
    return { args };
  },
  template: `
    <DSwitch v-bind="args">
      <template v-slot:caption><b>Caption slot</b></template>
    </DSwitch>
  `,
});
export const SlotCaption = SlotCaptionTemplate.bind({});

const SlotLabelFalsyTemplate: Story = (args) => ({
  components: { DSwitch },
  setup() {
    return { args };
  },
  template: `
    <DSwitch v-bind="args">
      <template v-slot:labelFalsy><b>❌</b></template>
    </DSwitch>
  `,
});
export const SlotLabelFalsy = SlotLabelFalsyTemplate.bind({});

const SlotLabelTruthyTemplate: Story = (args) => ({
  components: { DSwitch },
  setup() {
    return { args };
  },
  template: `
    <DSwitch v-bind="args">
      <template v-slot:labelTruthy><b>✔️</b></template>
    </DSwitch>
  `,
});
export const SlotLabelTruthy = SlotLabelTruthyTemplate.bind({});

const SlotThumbTemplate: Story = (args) => ({
  components: { DSwitch },
  setup() {
    return { args };
  },
  template: `
    <DSwitch v-bind="args">
      <template v-slot:thumb><b>👍</b></template>
    </DSwitch>
  `,
});
export const SlotThumb = SlotThumbTemplate.bind({});
