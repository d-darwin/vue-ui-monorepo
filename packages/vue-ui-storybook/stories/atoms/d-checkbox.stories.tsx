import { Story } from "@storybook/vue3";
import DCheckbox from "@darwin-studio/vue-ui/src/components/atoms/d-checkbox";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";

export default {
  title: "atoms/DCheckbox",
  component: DCheckbox,
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
    checked: true,
    value: "some value",
    id: "custom-id",
    inputClass: "someCustomInputClass",
    inputAttrs: { autofocus: true },
    label: "Some label",
    labelFont: undefined,
    labelClass: "someCustomLabelClass",
    disabled: false,
    colorScheme: COLOR_SCHEME.SECONDARY, // TODO: don't hardcode values
    rounding: ROUNDING.MEDIUM, // TODO: don't hardcode values
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

const SlotLabelTemplate: Story = (args) => ({
  components: { DCheckbox },
  setup() {
    return { args };
  },
  template: `
    <DCheckbox v-bind="args">
      <template v-slot:label><b>Label slot</b></template>
    </DCheckbox>
  `,
});
export const SlotLabel = SlotLabelTemplate.bind({});

const SlotErrorTemplate: Story = (args) => ({
  components: { DCheckbox },
  setup() {
    return { args };
  },
  template: `
    <DCheckbox v-bind="args">
      <template v-slot:error><b>Error slot</b></template>
    </DCheckbox>
  `,
});
export const SlotError = SlotErrorTemplate.bind({});
