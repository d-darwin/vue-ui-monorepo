import { Story } from "@storybook/vue3";
import DButton from "@darwin-studio/vue-ui/src/components/atoms/d-button";
// TODO: use vue-ui-codegen/config.json to define path
import { COLOR_SCHEME } from "@darwin-studio/vue-ui-codegen/dist/constants/color-scheme";
import { PADDING } from "@darwin-studio/vue-ui-codegen/dist/constants/padding";
import { ROUNDING } from "@darwin-studio/vue-ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition";

export default {
  title: "atoms/DButton",
  component: DButton,
  argTypes: {
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
    onClick: {
      action: "click",
    },
  },
  args: {
    label: "Some text content",
    href: "",
    disabled: false,
    preventDefault: true,
    colorScheme: COLOR_SCHEME.PRIMARY, // TODO: don't hardcode values
    padding: PADDING.DEFAULT, // TODO: don't hardcode values
    rounding: ROUNDING.MEDIUM, // TODO: don't hardcode values
    size: SIZE.MEDIUM, // TODO: don't hardcode values
    transition: TRANSITION.SLOW, // TODO: don't hardcode values
    whenClick: () => {
      console.log("click");
    },
  },
};

const Template: Story = (args) => ({
  components: { DButton },
  setup() {
    return { args };
  },
  template: `<DButton v-bind="args" />`,
});
export const Default = Template.bind({});

const SlotTemplate: Story = (args) => ({
  components: { DButton },
  setup() {
    return { args };
  },
  template: `
    <DButton v-bind="args">
      <img height="8" width="8" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII" />
    </DButton>
  `,
});
export const SlotDefault = SlotTemplate.bind({});
SlotDefault.args = {
  padding: PADDING.EQUAL,
};
