import { Story } from "@storybook/vue3";
import DButton from "@darwin-studio/vue-ui/src/components/atoms/d-button";
// TODO: use vue-ui-codegen/config.json to define path
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size";
import { COLOR_SCHEME } from "@darwin-studio/vue-ui-codegen/dist/constants/color-scheme";

export default {
  title: "atoms/DButton",
  component: DButton,
  argTypes: {
    size: {
      control: { type: "select" },
      options: Object.values(SIZE),
    },
    colorScheme: {
      control: { type: "select" },
      options: Object.values(COLOR_SCHEME),
    },
  },
  args: {
    text: "Some text content",
    html: "",
    size: SIZE.MEDIUM,
    colorScheme: COLOR_SCHEME.PRIMARY,
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
