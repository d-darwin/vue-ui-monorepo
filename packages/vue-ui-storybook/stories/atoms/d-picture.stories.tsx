import { Story } from "@storybook/vue3";
import DPicture from "@darwin-studio/vue-ui/src/components/atoms/d-picture";

export default {
  title: "atoms/DPicture",
  component: DPicture,
  args: {
    source: "https://www.linkpicture.com/q/Screenshot-2022-01-31-114450.png",
    aspectRatio: "3:2",
  },
};

const Template: Story = (args) => ({
  components: { DPicture },
  setup() {
    return { args };
  },
  template: `<DPicture v-bind="args" />`,
});
export const Default = Template.bind({});
