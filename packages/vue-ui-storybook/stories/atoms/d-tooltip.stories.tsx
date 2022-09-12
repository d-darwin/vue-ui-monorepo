import { Story } from "@storybook/vue3";
import DTooltip from "@darwin-studio/vue-ui/src/components/atoms/d-tooltip";
import styles from "./d-tooltip.css";

export default {
  title: "atoms/DTooltip",
  component: DTooltip,
  argTypes: {},
  args: {},
};

const Template: Story = (args) => ({
  components: { DTooltip: DTooltip },
  setup() {
    return { args, styles };
  },
  template: `<DTooltip v-bind="args" :class="styles.dTooltip" />`,
});
export const Default = Template.bind({});

const SlotTemplate: Story = (args) => ({
  components: { DTooltip: DTooltip },
  setup() {
    return { args, styles };
  },
  template: `<DTooltip v-bind="args" :class="styles.dTooltip">Some <b>slot</b> content</DTooltip>`,
});
export const SlotDefault = SlotTemplate.bind({});
