import { Story } from "@storybook/vue3";
import DTooltip from "@darwin-studio/vue-ui/src/components/atoms/d-tooltip";
import { POSITION } from "@darwin-studio/vue-ui/src/constants/position";
import { TRIGGER } from "@darwin-studio/vue-ui/src/components/atoms/d-tooltip/constant";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";
import styles from "./d-tooltip.css";

export default {
  title: "atoms/DTooltip",
  component: DTooltip,
  argTypes: {
    targetFont: {
      control: { type: "select" },
      options: [undefined, ...Object.values(FONT)],
    },
    contentFont: {
      control: { type: "select" },
      options: [undefined, ...Object.values(FONT)],
    },
    position: {
      control: { type: "select" },
      options: Object.values(POSITION),
    },
    trigger: {
      control: { type: "select" },
      options: Object.values(TRIGGER),
    },
    padding: {
      control: { type: "select" },
      options: Object.values(PADDING),
    },
    rounding: {
      control: { type: "select" },
      options: Object.values(ROUNDING),
    },
    size: {
      control: { type: "select" },
      options: Object.values(SIZE),
    },
    transition: {
      control: { type: "select" },
      options: Object.values(TRANSITION),
    },
    onChange: {
      action: "change",
    },
  },
  args: {
    target: "Some target string",
    targetFont: undefined,
    targetClass: "someCustomTargetClass",
    content: "Some content string",
    contentFont: undefined,
    contentClass: "someCustomContentClass",
    position: POSITION.TOP,
    offset: [4, 4],
    trigger: TRIGGER.HOVER,
    forceShow: false,
    tabindex: 0,
    hasArrow: true,
    padding: PADDING.DEFAULT, // TODO: don't hardcode values
    rounding: ROUNDING.MEDIUM, // TODO: don't hardcode values
    size: SIZE.TINY, // TODO: don't hardcode values
    transition: TRANSITION.FAST, // TODO: don't hardcode values
    tag: "div",
    enableHtml: false,
    whenChange: (show: boolean) => {
      console.log("change", show);
    },
  },
};

const Template: Story = (args) => ({
  components: { DTooltip },
  setup() {
    return { args, styles };
  },
  template: `<DTooltip v-bind="args" :class="styles.dTooltip" />`,
});
export const Default = Template.bind({});

const SlotTargetTemplate: Story = (args) => ({
  components: { DTooltip },
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
  components: { DTooltip },
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
