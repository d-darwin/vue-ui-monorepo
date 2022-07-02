import { Story } from "@storybook/vue3";
import DAspectRatio from "@darwin-studio/vue-ui/src/components/containers/d-aspect-ratio";
import "./d-aspect-ratio.css";

export default {
  title: "containers/DAspectRatio",
  component: DAspectRatio,
  args: {
    aspectRatio: "2:3",
    tag: "div",
  },
};

const Template: Story = (args) => ({
  components: { DAspectRatio },
  setup() {
    return { args };
  },
  template: `
    <DAspectRatio v-bind="args" class="dAspectRatio">
      <div class="dAspectRatioContent">{{ args.aspectRatio }}</div>
    </DAspectRatio>
  `,
});
export const Default = Template.bind({});
