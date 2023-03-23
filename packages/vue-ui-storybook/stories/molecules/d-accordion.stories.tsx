import DAccordion from "@darwin-studio/vue-ui/src/components/molecules/d-accordion";
import { Story } from "@storybook/vue3";

export default {
  title: "molecules/DAccordion",
  component: DAccordion,
  argTypes: {
    // TODO
  },
  args: {
    // TODO
  },
};

const Template: Story = (args) => ({
  components: { DAccordion },
  setup() {
    return { args };
  },
  template: `<DAccordion v-bind="args" />`,
});
export const Default = Template.bind({});
