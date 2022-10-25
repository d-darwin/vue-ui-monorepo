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
  },*/
  args: {
    headers: ["Column 1", "Column 2", "Column 3"],
    items: [
      ["item 11", "item 12", "item 13"],
      ["item 21", "item 22", "item 23"],
      ["item 31", "item 32", "item 33"],
    ],
  },
};

const Template: Story = (args) => ({
  components: { DTable },
  setup() {
    return { args };
  },
  template: `<DTable v-bind="args" />`,
});
export const Default = Template.bind({});
