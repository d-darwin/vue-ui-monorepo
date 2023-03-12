import { Story } from "@storybook/vue3";
import DSlider from "@darwin-studio/vue-ui/src/components/atoms/d-slider";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";

export default {
  title: "atoms/DSlider",
  component: DSlider,
  argTypes: {
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
    // TODO
  },
  args: {
    label: "Label",
    caption: "Error string",
    colorScheme: COLOR_SCHEME.PRIMARY, // TODO: don't hardcode values
    rounding: ROUNDING.FULL, // TODO: don't hardcode values
    size: SIZE.MEDIUM, // TODO: don't hardcode values
    transition: TRANSITION.FAST, // TODO: don't hardcode values
    // TODO
  },
};

const Template: Story = (args) => ({
  components: { DSlider },
  setup() {
    return { args };
  },
  template: `<DSlider v-bind="args" />`,
});
export const Default = Template.bind({});
