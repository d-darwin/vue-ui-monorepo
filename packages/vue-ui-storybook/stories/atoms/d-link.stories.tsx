import { Story } from "@storybook/vue3";
import DLink from "@darwin-studio/vue-ui/src/components/atoms/d-link";
// TODO: use vue-ui-codegen/config.json to define path
import { FONT } from "@darwin-studio/vue-ui-codegen/dist/constants/font";
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition";

export default {
  title: "atoms/DLink",
  component: DLink,
  argTypes: {
    font: {
      control: { type: "select" },
      options: Object.values(Object.values(FONT)),
    },
    transition: {
      control: { type: "select" },
      options: Object.values(TRANSITION),
    },
  },
  args: {
    text: "Some text content",
    html: "",
    href: "/some-link",
    font: FONT.MEDIUM, // TODO: don't hardcode values
    transition: TRANSITION.SLOW, // TODO: don't hardcode values
  },
};

const Template: Story = (args) => ({
  components: { DLink },
  setup() {
    return { args };
  },
  template: `<DLink v-bind="args" />`,
});
export const Default = Template.bind({});

const SlotTemplate: Story = (args) => ({
  components: { DLink },
  setup() {
    return { args };
  },
  template: `<DLink v-bind="args">Some <a href="#">slot</a> content</DLink>`,
});
export const SlotDefault = SlotTemplate.bind({});
