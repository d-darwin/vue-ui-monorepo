import { Story } from "@storybook/vue3";
import DDrawer from "@darwin-studio/vue-ui/src/components/organisms/d-drawer";
import DButton from "@darwin-studio/vue-ui/src/components/atoms/d-button";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import {
  POSITION_HORIZONTAL,
  POSITION_VERTICAL,
} from "@darwin-studio/vue-ui/src/constants/position";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";

export default {
  title: "organisms/DDrawer",
  component: DDrawer,
  argTypes: {
    position: {
      control: { type: "select" },
      options: Object.values(
        Object.assign({}, POSITION_HORIZONTAL, POSITION_VERTICAL)
      ),
    },
    colorScheme: {
      control: { type: "select" },
      options: Object.values(COLOR_SCHEME),
    },
    titleFont: {
      control: { type: "select" },
      options: Object.values(FONT),
    },
    contentFont: {
      control: { type: "select" },
      options: Object.values(FONT),
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
    isShown: true,
    isModal: true,
    position: POSITION_HORIZONTAL.RIGHT,
    title: "Some drawer title",
    titleClass: "someTitleClass",
    titleFont: FONT.HUGE,
    // TODO: header
    // TODO: footer
    content: "Plain string content",
    contentClass: "someContentClass",
    contentFont: FONT.MEDIUM,
    width: "25%",
    height: "25%",
    target: "body",
    colorScheme: COLOR_SCHEME.PRIMARY, // TODO: don't hardcode values
    padding: PADDING.DEFAULT, // TODO: don't hardcode values
    rounding: ROUNDING.LARGE, // TODO: don't hardcode values
    size: SIZE.LARGE, // TODO: don't hardcode values
    transition: TRANSITION.FAST, // TODO: don't hardcode values
    role: "complementary",
    contentRole: "navigation",
    tag: TAG_NAME_DEFAULTS.ASIDE,
    contentTag: TAG_NAME_DEFAULTS.NAV,
    zIndex: 1001,
    hideHeader: false,
    closeButtonOptions: {
      colorScheme: COLOR_SCHEME.ALTERNATIVE,
    },
    enableInline: false,
    enableHtml: false,
    whenClose: () => {
      console.log("close");
    },
  },
};

const Template: Story = (args) => ({
  components: { DDrawer, DButton },
  setup() {
    return { args };
  },
  data() {
    return {
      isShown: false,
    };
  },
  methods: {
    clickHandler() {
      this.isShown = !this.isShown;
      if (!this.isShown) {
        this.args.whenClose?.();
      }
    },
    closeHandler() {
      this.isShown = false;
      this.args.whenClose?.();
    },
  },
  template: `
    <div>
      <DButton :whenClick="clickHandler">Toggle</DButton>
      <DDrawer v-bind="args" :isShown="isShown && this.args.isShown" :whenClose="closeHandler" />
    </div>
  `,
});
export const Default = Template.bind({});

// TODO: content via props.content
const SlotDefaultTemplate: Story = (args) => ({
  components: { DDrawer, DButton },
  setup() {
    return { args };
  },
  data() {
    return {
      isShown: false,
    };
  },
  methods: {
    clickHandler() {
      this.isShown = !this.isShown;
      if (!this.isShown) {
        this.args.whenClose?.();
      }
    },
    closeHandler() {
      this.isShown = false;
      this.args.whenClose?.();
    },
  },
  template: `
    <div>
      <DButton :whenClick="clickHandler">Toggle</DButton>
      <DDrawer v-bind="args" :isShown="isShown && this.args.isShown" :whenClose="closeHandler">
        <b>Default slot</b>
      </DDrawer>
    </div>
  `,
});
export const SlotDefault = SlotDefaultTemplate.bind({});

const SlotHeaderTemplate: Story = (args) => ({
  components: { DDrawer, DButton },
  setup() {
    return { args };
  },
  data() {
    return {
      isShown: false,
    };
  },
  methods: {
    clickHandler() {
      this.isShown = !this.isShown;
      if (!this.isShown) {
        this.args.whenClose?.();
      }
    },
    closeHandler() {
      this.isShown = false;
      this.args.whenClose?.();
    },
  },
  template: `
    <div>
      <DButton :whenClick="clickHandler">Toggle</DButton>
      <DDrawer v-bind="args" :isShown="isShown && this.args.isShown" :whenClose="closeHandler">
        <template v-slot:header><b>Header slot</b></template>
      </DDrawer>
    </div>
  `,
});
export const SlotHeader = SlotHeaderTemplate.bind({});

const SlotFooterTemplate: Story = (args) => ({
  components: { DDrawer, DButton },
  setup() {
    return { args };
  },
  data() {
    return {
      isShown: false,
    };
  },
  methods: {
    clickHandler() {
      this.isShown = !this.isShown;
      if (!this.isShown) {
        this.args.whenClose?.();
      }
    },
    closeHandler() {
      this.isShown = false;
      this.args.whenClose?.();
    },
  },
  template: `
    <div>
      <DButton :whenClick="clickHandler">Toggle</DButton>
      <DDrawer v-bind="args" :isShown="isShown && this.args.isShown" :whenClose="closeHandler">
        <template v-slot:footer><b>Footer slot</b></template>
      </DDrawer>
    </div>
  `,
});
export const SlotFooter = SlotFooterTemplate.bind({});
