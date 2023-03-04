import { Story } from "@storybook/vue3";
import DDrawer from "@darwin-studio/vue-ui/src/components/organisms/d-drawer";

export default {
  title: "organisms/DDrawer",
  component: DDrawer,
};

const Template: Story = (args) => ({
  components: { DDrawer },
  setup() {
    return { args };
  },
  template: `<DDrawer v-bind="args" />`,
});
export const Default = Template.bind({});
