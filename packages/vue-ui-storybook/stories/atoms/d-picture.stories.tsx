import { Story } from "@storybook/vue3";
import DPicture from "@darwin-studio/vue-ui/src/components/atoms/d-picture";

export default {
  title: "atoms/DPicture",
  component: DPicture,
};

const Template: Story = (args) => ({
  components: { DPicture },
  setup() {
    return { args };
  },
  template: `<DPicture v-bind="args" />`,
});
export const Default = Template.bind({});
