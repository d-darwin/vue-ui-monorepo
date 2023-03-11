import { Story } from "@storybook/vue3";
import DLoader from "@darwin-studio/vue-ui/src/components/atoms/d-loader";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";

export default {
  title: "atoms/DLoader",
  component: DLoader,
  argTypes: {
    colorScheme: {
      control: { type: "select" },
      options: Object.values(COLOR_SCHEME),
    },
    font: {
      control: { type: "select" },
      options: Object.values(FONT),
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
    content: undefined,
    colorScheme: COLOR_SCHEME.PRIMARY,
    font: FONT.HUGE,
    rounding: ROUNDING.FULL,
    size: SIZE.MEDIUM,
    transition: TRANSITION.FAST,
    zIndex: 1001,
    fillAvailable: false,
    animationDuration: "500ms",
  },
};

const Template: Story = (args) => ({
  components: { DLoader },
  setup() {
    return { args };
  },
  template: `<DLoader v-bind="args" />`,
});
export const Default = Template.bind({});

const FillAvailableTemplate: Story = (args) => ({
  components: { DLoader },
  setup() {
    return { args };
  },
  template: `<DLoader v-bind="args" />`,
});
export const FillAvailable = FillAvailableTemplate.bind({});
FillAvailable.args = {
  fillAvailable: true,
};

const ContentTemplate: Story = (args) => ({
  components: { DLoader },
  setup() {
    return { args };
  },
  template: `<DLoader v-bind="args" />`,
});
export const Content = ContentTemplate.bind({});
Content.args = {
  content: <b>🔥</b>,
};
