import { Story } from "@storybook/vue3";
import {
  DAccordion,
  DDetails,
} from "@darwin-studio/vue-ui/src/components/molecules/d-accordion";
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
    justCheck: true,
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
  computed: {
    content() {
      return [
        <DDetails summary="Summary 1" content="Some content 1" />,
        <DDetails summary="Summary 2" content="Some content 2" />,
        <DDetails summary="Summary 3" content="Some content 3" />,
      ];
    },
  },
  template: `<DAccordion v-bind="args" :content="content" />`,
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

// TODO: own file with default export and  title: "molecules/DAccordion", ???
const DetailsTemplate: Story = (args) => ({
  components: { DDetails },
  setup() {
    return { args };
  },
  template: `<DDetails summary="Summary 1" content="Some content 1" v-bind="args" />`,
});
export const DetailsDefault = DetailsTemplate.bind({});

// TODO: other DDetails stories
