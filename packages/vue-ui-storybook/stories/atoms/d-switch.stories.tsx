import { Story } from "@storybook/vue3";
import DSwitch from "@darwin-studio/vue-ui/src/components/atoms/d-switch";

export default {
  title: "atoms/DSwitch",
  component: DSwitch,
  argTypes: {
    onChange: {
      action: "change",
    },
    onInput: {
      action: "input",
    },
  },
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
    enableHtml: false,
    whenChange: (checked: boolean, value: Text) => {
      console.log("change", checked, value);
    },
    whenInput: (value: Text | undefined) => {
      console.log("input", value);
    },
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
