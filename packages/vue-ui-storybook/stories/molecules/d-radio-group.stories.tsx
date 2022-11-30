import { Story } from "@storybook/vue3";
import DRadioGroup from "@darwin-studio/vue-ui/src/components/molecules/d-radio-group";
import DRadio from "@darwin-studio/vue-ui/src/components/atoms/d-radio";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";

export default {
  title: "molecules/DRadioGroup",
  component: DRadioGroup,
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
    name: "some-group-name",
    label: "Some text content",
    labelFont: undefined,
    labelClass: "someCustomLabelClass",
    error: "Some error string",
    errorFont: undefined,
    errorClass: "someCustomErrorClass",
    disabled: false,
    colorScheme: COLOR_SCHEME.SECONDARY, // TODO: don't hardcode values
    rounding: ROUNDING.FULL, // TODO: don't hardcode values
    size: SIZE.TINY, // TODO: don't hardcode values
    transition: TRANSITION.FAST, // TODO: don't hardcode values
    tag: "fieldset",
    enableHtml: false,
  },
};

const Template: Story = (args) => ({
  components: { DRadioGroup, DRadio },
  setup() {
    return { args };
  },
  computed: {
    items() {
      return [
        <DRadio label={"checkbox 1"} value={1} />,
        <DRadio label={"checkbox 2"} value={2} />,
        <DRadio label={"checkbox 3"} value={3} />,
      ];
    },
  },
  template: `<DRadioGroup v-bind="args" :items="items" />`,
});
export const Default = Template.bind({});

const TemplateSlots: Story = (args) => ({
  components: { DRadioGroup, DRadio },
  setup() {
    return { args };
  },
  template: `
    <DRadioGroup v-bind="args">
      <DRadio label="checkbox 1" value="1" />
      <DRadio label="checkbox 2" value="2"/>
      <DRadio label="checkbox 3" value="3"/>
    </DRadioGroup>
  `,
});
export const Slot = TemplateSlots.bind({});
