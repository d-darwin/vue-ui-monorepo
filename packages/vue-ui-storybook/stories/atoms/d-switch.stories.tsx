import { Story } from "@storybook/vue3";
import DSwitch from "@darwin-studio/vue-ui/src/components/atoms/d-switch";

export default {
  title: "atoms/DSwitch",
  component: DSwitch,
  args: {
    checked: false,
    labels: {
      falsy: "Off",
      truthy: "On",
    },
    values: {
      falsy: "falsy",
      truthy: "truthy",
    },
    error: "Some error string",
  },
};

const Template: Story = (args) => ({
  components: { DSwitch },
  setup() {
    return { args };
  },
  template: `<DSwitch v-bind="args" />`,
});

export const Default = Template.bind({});
