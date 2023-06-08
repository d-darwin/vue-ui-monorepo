import { Story } from "@storybook/vue3";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import {
  DAccordion,
  DDetails,
} from "@darwin-studio/vue-ui/src/components/molecules/d-accordion";
import dAccordionConfig from "@darwin-studio/vue-ui/src/components/molecules/d-accordion/config";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";
import sleep from "@darwin-studio/vue-ui/src/utils/sleep";

export default {
  title: "molecules/DAccordion",
  component: DAccordion,
  argTypes: {
    /**
     * TODO: argTypes
     */
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
    // TODO 2
    onChange: {
      action: "change",
    },
    // TODO 3
    "onUpdate:???": {
      action: "update:???",
    },
  },
  args: {
    /**
     * TODO: args
     */
    openIds: [33],
    hideSummaryAfter: false,
    disabled: false,
    colorScheme: COLOR_SCHEME.PRIMARY, // TODO: don't hardcode values
    padding: PADDING.DEFAULT, // TODO: don't hardcode values
    rounding: ROUNDING.MEDIUM, // TODO: don't hardcode values
    size: SIZE.MEDIUM, // TODO: don't hardcode values
    transition: TRANSITION.SLOW, // TODO: don't hardcode values
    // TODO 1
    whenChange: (id: Text, open: boolean) => {
      console.log("change", id, open);
    },
  },
};

const Template: Story = (args) => ({
  components: { DAccordion, DDetails },
  setup() {
    return { args };
  },
  computed: {
    content() {
      return [
        <DDetails summary="Summary 1" content="Some content 1" />,
        <DDetails summary="Summary 2" content="Some content 2" />,
        <DDetails summary="Summary 3" content="Some content 3" />,
      ];
    },
  },
  template: `<DAccordion v-bind="args" :content="content"/>`,
});
export const Default = Template.bind({});

const TemplateSolo: Story = (args) => ({
  components: { DAccordion, DDetails },
  setup() {
    return { args };
  },
  data() {
    return {
      innerOpenIds: args.openIds || [],
    };
  },
  computed: {
    content() {
      return [
        <DDetails id={11} summary="Summary 1" content="Some content 1" />,
        <DDetails id={12} summary="Summary 2" content="Some content 2" />,
        <DDetails id={13} summary="Summary 3" content="Some content 3" />,
      ];
    },
  },
  methods: {
    changeHandler(id: Text, open: boolean) {
      if (open) {
        this.innerOpenIds = [id];
      } else {
        this.innerOpenIds = this.innerOpenIds.filter(
          (innerId: Text) => innerId != id
        );
      }
      args.whenChange?.(id, open);
    },
  },
  template: `<DAccordion v-bind="args" :content="content" :openIds="innerOpenIds" :whenChange="changeHandler" />`,
});
export const Solo = TemplateSolo.bind({});

const TemplateAutoClose: Story = (args) => ({
  components: { DAccordion, DDetails },
  setup() {
    return { args };
  },
  data() {
    return {
      innerOpenIds: args.openIds || [],
    };
  },
  computed: {
    content() {
      return [
        <DDetails id={11} summary="Summary 1" content="Some content 1" />,
        <DDetails id={22} summary="Summary 2" content="Some content 2" />,
        <DDetails id={33} summary="Summary 3" content="Some content 3" />,
      ];
    },
  },
  methods: {
    async changeHandler(id: Text, open: boolean) {
      if (open) {
        this.innerOpenIds.push(id);
        await sleep(3000);
        this.innerOpenIds = this.innerOpenIds.filter(
          (innerId: Text) => innerId != id
        );
      } else {
        this.innerOpenIds = this.innerOpenIds.filter(
          (innerId: Text) => innerId != id
        );
      }
      args.whenChange?.(id, open);
    },
  },
  template: `<DAccordion v-bind="args" :content="content" :openIds="innerOpenIds" :whenChange="changeHandler" />`,
});
export const AutoClose = TemplateAutoClose.bind({});

const TemplateSlot: Story = (args) => ({
  components: { DAccordion, DDetails },
  setup() {
    return { args };
  },
  template: `
    <DAccordion v-bind="args">
      <DDetails summary="Summary 1" content="Some content 1" />
      <DDetails summary="Summary 2" content="Some content 2" />
      <DDetails summary="Summary 3" content="Some content 3" />
    </DAccordion>
  `,
});
export const DefaultSlot = TemplateSlot.bind({});

// TODO: redefine config story !!!
dAccordionConfig.summaryAfterContent = "⛛";
