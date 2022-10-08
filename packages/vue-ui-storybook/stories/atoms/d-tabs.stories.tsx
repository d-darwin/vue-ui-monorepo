import { DTabs, DTab } from "@darwin-studio/vue-ui/src/components/atoms/d-tabs";
import { Story } from "@storybook/vue3";

export default {
  title: "atoms/DTabs",
  component: DTabs,
};

const Template: Story = (args) => ({
  components: { DTabs, DTab },
  setup() {
    return { args };
  },
  template: `
    <DTabs v-bind="args">
      <DTab />
      <DTab />
    </DTabs>
  `,
});
export const Default = Template.bind({});
