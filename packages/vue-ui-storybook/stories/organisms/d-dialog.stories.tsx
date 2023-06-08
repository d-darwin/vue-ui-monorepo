import { Story } from "@storybook/vue3";
import DDialog from "@darwin-studio/vue-ui/src/components/organisms/d-dialog";
import DButton from "@darwin-studio/vue-ui/src/components/atoms/d-button";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import { TAG_NAME } from "@darwin-studio/vue-ui/src/constants/tag-name";

export default {
  title: "organisms/DDialog",
  component: DDialog,
  argTypes: {
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
    onCancel: {
      action: "cancel",
    },
    onAccept: {
      action: "accept",
    },
  },
  args: {
    isShown: true,
    isModal: true,
    title: "Some dialog title",
    titleClass: "someTitleClass",
    titleFont: FONT.HUGE,
    // TODO: header
    // TODO: footer
    content: "Plain string content",
    contentClass: "someContentClass",
    contentFont: FONT.MEDIUM,
    minWidth: "25%",
    maxWidth: "50%",
    minHeight: "25%",
    maxHeight: "50%",
    target: "body",
    colorScheme: COLOR_SCHEME.PRIMARY, // TODO: don't hardcode values
    padding: PADDING.EQUAL, // TODO: don't hardcode values
    rounding: ROUNDING.LARGE, // TODO: don't hardcode values
    size: SIZE.LARGE, // TODO: don't hardcode values
    transition: TRANSITION.FAST, // TODO: don't hardcode values
    role: "dialog",
    tag: TAG_NAME.DIALOG,
    zIndex: 1001,
    hideHeader: false,
    hideFooter: false,
    // TODO: argTypes
    backdropOptions: {
      colorScheme: COLOR_SCHEME.PRIMARY,
    },
    closeButtonOptions: {
      colorScheme: COLOR_SCHEME.DANGER,
    },
    cancelButtonOptions: {
      label: "Cancel",
    },
    acceptButtonOptions: {
      label: "Accept",
    },
    enableInline: false,
    whenClose: () => {
      console.log("close");
    },
    whenCancel: () => {
      console.log("cancel");
    },
    whenAccept: () => {
      console.log("accept");
    },
  },
};

const Template: Story = (args) => ({
  components: { DDialog, DButton },
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
    },
    closeHandler() {
      this.isShown = false;
      this.args.whenClose?.();
    },
    cancelHandler() {
      this.args.whenCancel?.();
      this.closeHandler();
    },
    acceptHandler() {
      this.args.whenAccept?.();
      this.closeHandler();
    },
  },
  template: `
    <div>
      <DButton :whenClick="clickHandler">Toggle</DButton>
      <DDialog
        v-bind="args"
        :isShown="isShown && this.args.isShown"
        :whenClose="closeHandler"
        :whenCancel="cancelHandler"
        :whenAccept="acceptHandler"
      />
    </div>
  `,
});
export const Default = Template.bind({});

// TODO: content via props.content
const SlotDefaultTemplate: Story = (args) => ({
  components: { DDialog, DButton },
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
    cancelHandler() {
      this.args.whenCancel?.();
      this.closeHandler();
    },
    acceptHandler() {
      this.args.whenAccept?.();
      this.closeHandler();
    },
  },
  template: `
    <div>
      <DButton :whenClick="clickHandler">Toggle</DButton>
      <DDialog
        v-bind="args"
        :isShown="isShown && this.args.isShown"
        :whenClose="closeHandler"
        :whenCancel="cancelHandler"
        :whenAccept="acceptHandler"
      >
        <b>Default slot</b>
      </DDialog>
    </div>
  `,
});
export const SlotDefault = SlotDefaultTemplate.bind({});

const SlotHeaderTemplate: Story = (args) => ({
  components: { DDialog, DButton },
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
    cancelHandler() {
      this.args.whenCancel?.();
      this.closeHandler();
    },
    acceptHandler() {
      this.args.whenAccept?.();
      this.closeHandler();
    },
  },
  template: `
    <div>
      <DButton :whenClick="clickHandler">Toggle</DButton>
      <DDialog
        v-bind="args"
        :isShown="isShown && this.args.isShown"
        :whenClose="closeHandler"
        :whenCancel="cancelHandler"
        :whenAccept="acceptHandler"
      >
        <template v-slot:header><b>Header slot</b></template>
      </DDialog>
    </div>
  `,
});
export const SlotHeader = SlotHeaderTemplate.bind({});

const SlotFooterTemplate: Story = (args) => ({
  components: { DDialog, DButton },
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
    cancelHandler() {
      this.args.whenCancel?.();
      this.closeHandler();
    },
    acceptHandler() {
      this.args.whenAccept?.();
      this.closeHandler();
    },
  },
  template: `
    <div>
      <DButton :whenClick="clickHandler">Toggle</DButton>
      <DDialog
        v-bind="args"
        :isShown="isShown && this.args.isShown"
        :whenClose="closeHandler"
        :whenCancel="cancelHandler"
        :whenAccept="acceptHandler"
      >
        <template v-slot:footer><b>Footer slot</b></template>
      </DDialog>
    </div>
  `,
});
export const SlotFooter = SlotFooterTemplate.bind({});
