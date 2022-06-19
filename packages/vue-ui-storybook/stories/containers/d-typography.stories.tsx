import { Story } from "@storybook/vue3";
import DTypography from "@darwin-studio/vue-ui/src/components/containers/d-typography";
// TODO: use vue-ui-codegen/config.json to define path
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size";

export default {
  title: "containers/DTypography",
  component: DTypography,
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
  components: { DTypography },
  setup() {
    return { args };
  },
  template: `<DTypography v-bind="args" />`,
});
export const Default = Template.bind({});

const SlotTemplate: Story = (args) => ({
  components: { DTypography },
  setup() {
    return { args };
  },
  template: `<DTypography v-bind="args">Some <a href="#">slot</a> content</DTypography>`,
});
export const SlotDefault = SlotTemplate.bind({});
