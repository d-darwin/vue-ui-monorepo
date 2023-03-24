import {
  DAccordion,
  DDetails,
} from "@darwin-studio/vue-ui/src/components/molecules/d-accordion";
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
  components: { DAccordion, DDetails },
  setup() {
    return { args };
  },
  template: `
    <DAccordion v-bind="args">
      <DDetails summary="Summary 1" content="Some content 1" />
      <DDetails summary="Summary 2" content="Some content 2" />
      <DDetails summary="Summary 3" content="Some content 3" />
    </DAccordion>
  `,
});
export const Default = Template.bind({});
