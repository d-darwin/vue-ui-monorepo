import { Story } from "@storybook/vue3";
import DInput from "@darwin-studio/vue-ui/src/components/atoms/d-input";
import { FONT } from "@darwin-studio/vue-ui-codegen/dist/constants/font";
import { ROUNDING } from "@darwin-studio/vue-ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition";

export default {
  title: "atoms/DInput",
  component: DInput,
  argTypes: {
    rounding: {
      control: { type: "select" },
      options: Object.values(ROUNDING),
    },
    size: {
      control: { type: "select" },
      options: Object.values(SIZE),
    },
    inputFont: {
      control: { type: "select" },
      options: ["", ...Object.values(FONT)],
    },
    transition: {
      control: { type: "select" },
      options: Object.values(TRANSITION),
    },
  },
  args: {
    value: "some value",
    label: "Some label",
    placeholder: "Some placeholder",
    disabled: false,
    rounding: ROUNDING.MEDIUM, // TODO: don't hardcode values
    size: SIZE.MEDIUM, // TODO: don't hardcode values
    inputFont: "", // TODO: don't hardcode values
    transition: TRANSITION.SLOW, // TODO: don't hardcode values
    id: "custom-id",
    error: "Some error string",
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
