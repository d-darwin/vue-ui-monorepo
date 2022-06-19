import { Story } from "@storybook/vue3";
import DButton from "@darwin-studio/vue-ui/src/components/atoms/d-button";
// TODO: use vue-ui-codegen/config.json to define path
import { COLOR_SCHEME } from "@darwin-studio/vue-ui-codegen/dist/constants/color-scheme";
import { PADDING } from "@darwin-studio/vue-ui-codegen/dist/constants/padding";
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size";

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
    size: {
      control: { type: "select" },
      options: Object.values(SIZE),
    },
  },
  args: {
    text: "Some text content",
    html: "",
    colorScheme: COLOR_SCHEME.PRIMARY,
    padding: PADDING.DEFAULT,
    size: SIZE.MEDIUM,
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
  template: `<DButton v-bind="args">Some <a href="#">slot</a> content</DButton>`,
});
export const SlotDefault = SlotTemplate.bind({});
