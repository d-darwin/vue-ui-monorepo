import { Story } from "@storybook/vue3";
import DProgress from "@darwin-studio/vue-ui/src/components/atoms/d-progress";

export default {
  title: "atoms/DLoader",
  component: DProgress,
  argTypes: {
    /*TODO*/
  },
  args: {
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
export const Default = Template.bind({});
