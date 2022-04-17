import { Story } from "@storybook/vue3";
import DTypography from "@darwin-studio/vue-ui/src/components/containers/d-typography";

export default {
  title: "DTypography",
  component: DTypography,
  args: {
    content: "Some text",
  },
};

const Template: Story<{ content: string }> = (args: { content: string }) => ({
  components: { DTypography },
  setup() {
    return { args };
  },
  template: `<DTypography v-bind="args" />`,
});

export const Default = Template.bind({});
