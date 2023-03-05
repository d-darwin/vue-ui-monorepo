import { Story } from "@storybook/vue3";
import DDrawer from "@darwin-studio/vue-ui/src/components/organisms/d-drawer";
import DButton from "@darwin-studio/vue-ui/src/components/atoms/d-button";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";

export default {
  title: "organisms/DDrawer",
  component: DDrawer,
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
    // TODO: why doesnt display on actions tab ???
    onClose: {
      action: "close",
    },
  },
  args: {
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
      <DDrawer v-bind="args" :isShown="isShown" :whenClose="closeHandler" />
    </div>
  `,
});
export const Default = Template.bind({});

// TODO: content via props

// TODO: header slot

// TODO: footer slot
