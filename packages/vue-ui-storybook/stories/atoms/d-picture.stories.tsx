import { Story } from "@storybook/vue3";
import DPicture from "../../../vue-ui/src/components/atoms/d-responsive-image";
import "./d-picture.css";

export default {
  title: "atoms/DPicture",
  component: DPicture,
  args: {
    source: "https://www.linkpicture.com/q/Screenshot-2022-01-31-114450.png",
    aspectRatio: "3:2",
    objectFit: "cover", // TODO
    caption: "Some caption", // TODO
    loading: "lazy", // TODO
  },
};

const Template: Story = (args) => ({
  components: { DPicture },
  setup() {
    return { args };
  },
  template: `<DPicture v-bind="args" class="dPicture" />`,
});
export const Default = Template.bind({});
