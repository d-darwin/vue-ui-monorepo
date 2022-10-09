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
    whenClick: () => {
      console.log("click");
    },
  },
};

const Template: Story = (args) => ({
  components: { DTabs, DTab },
  setup() {
    return { args };
  },
  template: `
    <DTabs v-bind="args">
      <DTab label="Tab 1" />
      <DTab label="Tab 2" :active="true" />
    </DTabs>
  `,
});
export const Default = Template.bind({});
