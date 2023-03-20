import { Story } from "@storybook/vue3";
import DProgress from "@darwin-studio/vue-ui/src/components/atoms/d-progress";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";
import { Type } from "@darwin-studio/vue-ui/src/components/atoms/d-progress/types";

export default {
  title: "atoms/DProgress",
  component: DProgress,
  argTypes: {
    colorScheme: {
      control: { type: "select" },
      options: Object.values(COLOR_SCHEME),
    },
    type: {
      control: { type: "select" },
      options: Type,
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
    /*TODO*/
  },
  args: {
    label: "Some label",
    value: 50,
    content: "50%",
    caption: "Some caption",
    type: Type.linear,
    colorScheme: COLOR_SCHEME.PRIMARY,
    rounding: ROUNDING.MEDIUM,
    size: SIZE.MEDIUM,
    transition: TRANSITION.FAST,
    /*TODO*/
  },
};

const Template: Story = (args) => ({
  components: { DProgress },
  setup() {
    return { args };
  },
  template: `<DProgress v-bind="args" />`,
});
export const Linear = Template.bind({});

export const LinearIndeterminate = Template.bind({});
LinearIndeterminate.args = {
  value: undefined,
};

export const Circular = Template.bind({});
Circular.args = {
  type: Type.circular,
  rounding: ROUNDING.FULL,
};

export const CircularIndeterminate = Template.bind({});
CircularIndeterminate.args = {
  type: Type.circular,
  value: undefined,
  rounding: ROUNDING.FULL,
};
