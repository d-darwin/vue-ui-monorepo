import { Story } from "@storybook/vue3";
import DSlider from "@darwin-studio/vue-ui/src/components/atoms/d-slider";

export default {
  title: "atoms/DSlider",
  component: DSlider,
  argTypes: {
    // TODO
  },
  args: {
    // TODO
  },
};

const Template: Story = (args) => ({
  components: { DSlider },
  setup() {
    return { args };
  },
  template: `<DSlider v-bind="args" />`,
});
export const Default = Template.bind({});
