import { Story } from "@storybook/vue3";
import DBackdrop from "@darwin-studio/vue-ui/src/components/atoms/d-backdrop";
import config from "@darwin-studio/vue-ui/src/components/atoms/d-backdrop/config";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";

export default {
  title: "atoms/DBackdrop",
  component: DBackdrop,
  argTypes: {
    colorScheme: {
      control: { type: "select" },
      options: Object.values(COLOR_SCHEME),
    },
    onClick: {
      action: "click",
    },
  },
  args: {
    opacity: config.opacity,
    zIndex: config.zIndex,
    colorScheme: COLOR_SCHEME.PRIMARY,
    tag: "div",
    whenClick: () => {
      console.log("click");
    },
  },
};

const Template: Story = (args) => ({
  components: { DBackdrop },
  setup() {
    return { args };
  },
  template: `<DBackdrop v-bind="args" />`,
});
export const Default = Template.bind({});
