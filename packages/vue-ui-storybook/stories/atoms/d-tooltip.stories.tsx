import { Story } from "@storybook/vue3";
import DTooltip from "@darwin-studio/vue-ui/src/components/atoms/d-tooltip";
import styles from "./d-tooltip.css";

export default {
  title: "atoms/DTooltip",
  component: DTooltip,
  argTypes: {},
  args: {
    target: "Some target string",
    content: "Some content string",
  },
};

const Template: Story = (args) => ({
  components: { DTooltip: DTooltip },
  setup() {
    return { args, styles };
  },
  template: `<DTooltip v-bind="args" :class="styles.dTooltip" />`,
});
export const Default = Template.bind({});

const SlotTargetTemplate: Story = (args) => ({
  components: { DTooltip: DTooltip },
  setup() {
    return { args, styles };
  },
  template: `
    <DTooltip v-bind="args" :class="styles.dTooltip">
      <template v-slot:target>Some <b>target slot</b> content</template>
    </DTooltip>
  `,
});
export const SlotTarget = SlotTargetTemplate.bind({});

const SlotContentTemplate: Story = (args) => ({
  components: { DTooltip: DTooltip },
  setup() {
    return { args, styles };
  },
  template: `
    <DTooltip v-bind="args" :class="styles.dTooltip">
      <template v-slot:content>Some <b>content slot</b> content</template>
    </DTooltip>
  `,
});
export const SlotContent = SlotContentTemplate.bind({});
