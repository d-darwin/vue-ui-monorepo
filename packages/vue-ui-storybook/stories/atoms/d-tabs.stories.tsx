import { Story } from "@storybook/vue3";
import { DTabs, DTab } from "@darwin-studio/vue-ui/src/components/atoms/d-tabs";
import { PADDING } from "@darwin-studio/vue-ui-codegen/dist/constants/padding";
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size";

export default {
  title: "atoms/DTabs",
  component: DTabs,
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
    padding: PADDING.DEFAULT, // TODO: don't hardcode values
    size: SIZE.MEDIUM, // TODO: don't hardcode values
  },
};

const Template: Story = (args) => ({
  components: { DTabs, DTab },
  setup() {
    return { args };
  },
  template: `
    <DTabs v-bind="args">
      <DTab />
      <DTab :active="true" />
    </DTabs>
  `,
});
export const Default = Template.bind({});
