import { Story } from "@storybook/vue3";
import DCaption from "@darwin-studio/vue-ui/src/components/atoms/d-caption";
import { TYPE } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/constant";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";

export default {
  title: "atoms/DCaption",
  component: DCaption,
  argTypes: {
    type: {
      control: { type: "select" },
      options: Object.values(TYPE),
    },
    font: {
      control: { type: "select" },
      options: Object.values(FONT),
    },
  },
  args: {
    content: "Some text content",
    type: TYPE.DANGER,
    font: FONT.SMALL, // TODO: don't hardcode values
    tag: "div", // TODO: use const
  },
};

const Template: Story = (args) => ({
  components: { DCaption },
  setup() {
    return { args };
  },
  template: `<DCaption v-bind="args" />`,
});
export const Default = Template.bind({});
