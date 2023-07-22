import type { Meta, StoryObj } from '@storybook/vue3';
import DBackdrop from "@darwin-studio/vue-ui/src/components/atoms/d-backdrop";
import config from "@darwin-studio/vue-ui/src/components/atoms/d-backdrop/config";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";

const meta: Meta<typeof DBackdrop> = {
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
};

export default meta;
type Story = StoryObj<typeof DBackdrop>;

export const Primary: Story = {
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
