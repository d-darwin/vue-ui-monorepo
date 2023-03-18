import { Story } from "@storybook/vue3";
import DNotification from "@darwin-studio/vue-ui/src/components/atoms/d-notification";
// TODO: use ui-codegen/config.json to define path
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";
import { POSITION } from "@darwin-studio/vue-ui/src/constants/position";
import { TYPE } from "@darwin-studio/vue-ui/src/components/atoms/d-notification/constants";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";

export default {
  title: "atoms/DNotification",
  component: DNotification,
  argTypes: {
    position: {
      control: { type: "select" },
      options: Object.values(POSITION),
    },
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
    onClose: {
      action: "close",
    },
  },
  args: {
    content: "Some text content",
    position: POSITION.TOP_RIGHT,
    closable: true,
    minWidth: "",
    maxWidth: "",
    minHeight: "",
    maxHeight: "",
    tag: "div",
    duration: 5,
    notificationClass: "some-custom-class",
    target: "body",
    font: FONT.MEDIUM,
    colorScheme: COLOR_SCHEME.PRIMARY,
    type: TYPE.INFO,
    padding: PADDING.DEFAULT,
    rounding: ROUNDING.SMALL,
    size: SIZE.MEDIUM,
    transition: TRANSITION.FAST,
    whenClose: () => {
      console.log("close");
    },
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
