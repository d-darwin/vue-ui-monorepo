import { Story } from "@storybook/vue3";
import { PADDING } from "@darwin-studio/vue-ui-codegen/dist/constants/padding";
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size";
import DTable from "@darwin-studio/vue-ui/src/components/molecules/d-table";

export default {
  title: "molecules/DTable",
  component: DTable,
  argTypes: {
    padding: {
      control: { type: "select" },
      options: Object.values(PADDING),
    },
    size: {
      control: { type: "select" },
      options: Object.values(SIZE),
    },
  },
  args: {
    headRows: [["Column 1", "Column 2", "Column 3"]],
    bodyRows: [
      ["item 11", "item 12", "item 13"],
      ["item 21", "item 22", "item 23"],
      ["item 31", "item 32", "item 33"],
    ],
    padding: PADDING.DEFAULT, // TODO: don't hardcode values
    size: SIZE.MEDIUM, // TODO: don't hardcode values
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
