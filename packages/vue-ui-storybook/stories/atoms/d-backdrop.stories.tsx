import { Story } from "@storybook/vue3";
import DBackdrop from "@darwin-studio/vue-ui/src/components/atoms/d-backdrop";

export default {
  title: "atoms/DBackdrop",
  component: DBackdrop,
};

const Template: Story = (args) => ({
  components: { DBackdrop },
  setup() {
    return { args };
  },
  template: `<DBackdrop v-bind="args" />`,
});
export const Default = Template.bind({});
