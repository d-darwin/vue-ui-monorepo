import { Story } from "@storybook/vue3";
import DInput from "@darwin-studio/vue-ui/src/components/atoms/d-input";
import { FONT } from "@darwin-studio/vue-ui-codegen/dist/constants/font";
import { INPUT_TYPE } from "@darwin-studio/vue-ui/src/components/atoms/d-input/constants";
import { PADDING } from "@darwin-studio/vue-ui-codegen/dist/constants/padding";
import { ROUNDING } from "@darwin-studio/vue-ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition";

export default {
  title: "atoms/DInput",
  component: DInput,
  argTypes: {
    inputType: {
      control: { type: "select" },
      options: Object.values(INPUT_TYPE),
    },
    inputFont: {
      control: { type: "select" },
      options: [undefined, ...Object.values(FONT)],
    },
    labelFont: {
      control: { type: "select" },
      options: [undefined, ...Object.values(FONT)],
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
    errorFont: {
      control: { type: "select" },
      options: [undefined, ...Object.values(FONT)],
    },
    onChange: {
      action: "chang",
    },
    onInput: {
      action: "input",
    },
    onSubmit: {
      action: "submit",
    },
  },
  args: {
    value: "some value",
    placeholder: "Some placeholder",
    id: "custom-id",
    inputType: INPUT_TYPE.TEXT,
    inputSize: 1,
    inputClass: "someCustomInputClass",
    inputFont: undefined, // TODO: don't hardcode values
    inputAttrs: { autofocus: true },
    label: "Some label",
    labelFont: undefined,
    labelClass: "someCustomLabelClass",
    disabled: false,
    padding: PADDING.DEFAULT,
    rounding: ROUNDING.MEDIUM, // TODO: don't hardcode values
    size: SIZE.MEDIUM, // TODO: don't hardcode values
    transition: TRANSITION.SLOW, // TODO: don't hardcode values
    error: "Some error string",
    errorFont: undefined,
    errorClass: "someCustomErrorClass",
    tag: "div",
    whenChange: (value: Text | undefined) => {
      console.log("chang", value);
    },
    whenInput: (value: Text | undefined) => {
      console.log("input", value);
    },
    whenSubmit: (value: Text | undefined) => {
      console.log("submit", value);
    },
  },
};

const Template: Story = (args) => ({
  components: { DInput },
  setup() {
    return { args };
  },
  template: `<DInput v-bind="args" />`,
});
export const Default = Template.bind({});

const SlotBeforeTemplate: Story = (args) => ({
  components: { DInput },
  setup() {
    return { args };
  },
  template: `
    <DInput v-bind="args" >
      <template v-slot:before><b>...</b></template>
    </DInput>
  `,
});
export const SlotBefore = SlotBeforeTemplate.bind({});

const SlotAfterTemplate: Story = (args) => ({
  components: { DInput },
  setup() {
    return { args };
  },
  template: `
    <DInput v-bind="args" >
      <template v-slot:after><b>...</b></template>
    </DInput>
  `,
});
export const SlotAfter = SlotAfterTemplate.bind({});

const SlotLabelTemplate: Story = (args) => ({
  components: { DInput },
  setup() {
    return { args };
  },
  template: `
    <DInput v-bind="args" >
      <template v-slot:label><b>Label slot</b></template>
    </DInput>
  `,
});
export const SlotLabel = SlotLabelTemplate.bind({});

const SlotErrorTemplate: Story = (args) => ({
  components: { DInput },
  setup() {
    return { args };
  },
  template: `
    <DInput v-bind="args" >
      <template v-slot:error><b>Error slot</b></template>
    </DInput>
  `,
});
export const SlotError = SlotErrorTemplate.bind({});
