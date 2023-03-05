import { Story } from "@storybook/vue3";
import DDrawer from "@darwin-studio/vue-ui/src/components/organisms/d-drawer";
import DButton from "@darwin-studio/vue-ui/src/components/atoms/d-button";

export default {
  title: "organisms/DDrawer",
  component: DDrawer,
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
    },
  },
  template: `
    <div>
      <DButton :whenClick="clickHandler">Toggle</DButton>
      <DDrawer v-bind="args" :isShown="isShown" :whenClose="clickHandler" />
    </div>
  `,
});
export const Default = Template.bind({});
