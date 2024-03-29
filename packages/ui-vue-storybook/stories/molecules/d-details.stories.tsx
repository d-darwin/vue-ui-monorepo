import { Story } from "@storybook/vue3";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";
import { DDetails } from "@darwin-studio/vue-ui/src/components/molecules/d-accordion";
import { Text } from "@darwin-studio/vue-ui/src/types/text";
import dAccordionConfig from "@darwin-studio/vue-ui/src/components/molecules/d-accordion/config";
import sleep from "@darwin-studio/vue-ui/src/utils/sleep";

export default {
  title: "molecules/DAccordion/DDetails",
  component: DDetails,
  argTypes: {
    colorScheme: {
      control: { type: "select" },
      options: Object.values(COLOR_SCHEME),
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
    onToggle: {
      action: "click",
    },
    "onUpdate:open": {
      action: "update:open",
    },
  },
  args: {
    id: "why-not",
    summary: "Summary",
    summaryOptions: { class: "customSummaryClass" },
    hideSummaryAfter: false,
    disabled: false,
    content: "Some content string",
    contentOptions: { class: "customContentClass" },
    open: false,
    colorScheme: COLOR_SCHEME.PRIMARY, // TODO: don't hardcode values
    padding: PADDING.DEFAULT, // TODO: don't hardcode values
    rounding: ROUNDING.MEDIUM, // TODO: don't hardcode values
    size: SIZE.MEDIUM, // TODO: don't hardcode values
    transition: TRANSITION.SLOW, // TODO: don't hardcode values
    whenChange: (id: Text, open: boolean) => {
      console.log("change", id, open);
    },
  },
};

const Template: Story = (args) => ({
  components: { DDetails },
  setup() {
    return { args };
  },
  template: `<DDetails v-bind="args" />`,
});
export const Default = Template.bind({});

const AutoCloseTemplate: Story = (args) => ({
  components: { DDetails },
  setup() {
    return { args };
  },
  mounted() {
    this.innerOpen = true;
  },
  data() {
    return {
      innerOpen: false,
    };
  },
  methods: {
    async changeHandler(id: Text, open: boolean) {
      if (open) {
        this.innerOpen = true;
        await sleep(3000);
        this.innerOpen = false;
      } else {
        this.innerOpen = false;
      }
    },
  },
  template: `<DDetails v-bind="args" :open="innerOpen" :whenChange="changeHandler"/>`,
});
export const AutoClose = AutoCloseTemplate.bind({});

const DefaultSlotTemplate: Story = (args) => ({
  components: { DDetails },
  setup() {
    return { args };
  },
  template: `
    <DDetails v-bind="args">
      Default <b>slot</b>
    </DDetails>
  `,
});
export const DefaultSlot = DefaultSlotTemplate.bind({});

const SummarySlotTemplate: Story = (args) => ({
  components: { DDetails },
  setup() {
    return { args };
  },
  template: `
    <DDetails v-bind="args">
      <template v-slot:summary><span>Summary <b>slot</b></span></template>
    </DDetails>
  `,
});
export const SummarySlot = SummarySlotTemplate.bind({});

const SummaryAfterSlotTemplate: Story = (args) => ({
  components: { DDetails },
  setup() {
    return { args };
  },
  template: `
    <DDetails v-bind="args">
      <template v-slot:summaryAfter><span>⬇️</span></template>
    </DDetails>
  `,
});
export const SummaryAfterSlot = SummaryAfterSlotTemplate.bind({});

// TODO: redefine config story !!!
dAccordionConfig.summaryAfterContent = "⛛";
