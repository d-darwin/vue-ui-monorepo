import { Story } from "@storybook/vue3";
import DTable from "@darwin-studio/vue-ui/src/components/molecules/d-table";

export default {
  title: "molecules/DTable",
  component: DTable,
  // TODO
  /*  argTypes: {
    font: {
      control: { type: "select" },
      options: Object.values(FONT),
    },
  },
  args: {
    content: "Some text content",
    font: FONT.MEDIUM,
    tag: "div",
    enableHtml: false,
  },*/
};

const Template: Story = (args) => ({
  components: { DTable },
  setup() {
    return { args };
  },
  template: `<DTable v-bind="args" />`,
});
export const Default = Template.bind({});
