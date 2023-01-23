import { Story } from "@storybook/vue3";
import DNotification from "@darwin-studio/vue-ui/src/components/atoms/d-notification";
// TODO: use ui-codegen/config.json to define path
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";

export default {
  title: "atoms/DNotification",
  component: DNotification,
  args: {
    content: "Some text content",
    font: FONT.MEDIUM,
    tag: "div",
    enableHtml: false,
  },
};

const Template: Story = (args) => ({
  components: { DNotification },
  setup() {
    return { args };
  },
  template: `<DNotification v-bind="args" />`,
});
export const Default = Template.bind({});

const SlotTemplate: Story = (args) => ({
  components: { DNotification },
  setup() {
    return { args };
  },
  template: `<DNotification v-bind="args">Some <a href="#">slot</a> content</DNotification>`,
});
export const SlotDefault = SlotTemplate.bind({});
