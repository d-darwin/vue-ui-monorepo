import { Story } from "@storybook/vue3";
import DButton from "@darwin-studio/vue-ui/src/components/atoms/d-button";
import { SIZE } from "@darwin-studio/vue-ui-codegen/build/constants/size";

export default {
  title: "atoms/DButton",
  component: DButton,
  argTypes: {
    size: {
      control: { type: "select" },
      options: Object.values(SIZE),
    },
  },
  args: {
    text: "Some text content",
    html: "",
    size: SIZE.MEDIUM,
    tag: "div",
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
