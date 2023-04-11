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
    // TODO 1
  },
  args: {
    /**
     * TODO: args
     */
    openId: "",
    hideSummaryAfter: false,
    disabled: false,
    colorScheme: COLOR_SCHEME.PRIMARY, // TODO: don't hardcode values
    padding: PADDING.DEFAULT, // TODO: don't hardcode values
    rounding: ROUNDING.MEDIUM, // TODO: don't hardcode values
    size: SIZE.MEDIUM, // TODO: don't hardcode values
    transition: TRANSITION.SLOW, // TODO: don't hardcode values
    // TODO 2
  },
};

const Template: Story = (args) => ({
  components: { DAccordion, DDetails },
  setup() {
    return { args };
  },
  data() {
    return {
      innerOpenId: args.openId, // TODO: reactivity
    };
  },
  computed: {
    idList() {
      return [11, 12, 33];
    },
    content() {
      return [
        <DDetails
          id={this.idList[0]}
          summary="Summary 1"
          content="Some content 1"
        />,
        <DDetails
          id={this.idList[1]}
          summary="Summary 2"
          content="Some content 2"
        />,
        <DDetails
          id={this.idList[2]}
          summary="Summary 3"
          content="Some content 3"
        />,
      ];
    },
  },
  methods: {
    changeHandler(id: Text, open: boolean) {
      console.log(id, open);
      this.innerOpenId = open ? id : ""; // TODO: if not isSolo ???
    },
  },
  template: `<DAccordion v-bind="args" :content="content" :openId="innerOpenId" :whenChange="changeHandler" />`,
});
export const Default = Template.bind({});

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
dAccordionConfig.summaryIcon = "⛛";
