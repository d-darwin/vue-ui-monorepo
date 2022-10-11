import { ref } from "vue";
import { Story } from "@storybook/vue3";
import { DTabs, DTab } from "@darwin-studio/vue-ui/src/components/atoms/d-tabs";
import { PADDING } from "@darwin-studio/vue-ui-codegen/dist/constants/padding";
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition";

export default {
  title: "atoms/DTabs",
  component: DTabs,
  argTypes: {
    padding: {
      control: { type: "select" },
      options: Object.values(PADDING),
    },
    size: {
      control: { type: "select" },
      options: Object.values(SIZE),
    },
    transition: {
      control: { type: "select" },
      options: Object.values(TRANSITION),
    },
  },
  args: {
    padding: PADDING.DEFAULT, // TODO: don't hardcode values
    size: SIZE.MEDIUM, // TODO: don't hardcode values
  },
};

const Template: Story = (args) => ({
  components: { DTabs, DTab },
  setup() {
    const active = ref("tab_1");
    return { args, active };
  },
  template: `
    <DTabs v-bind="args">
      <template v-slot:tabs>
        <DTab label="Tab 1" :active="this.active === 'tab_1'" :whenClick="() => {this.active = 'tab_1'}" />
        <DTab label="Tab 2" :active="this.active === 'tab_2'" :whenClick="() => {this.active = 'tab_2'}" />
      </template>
      <template v-slot:tabpanels>
        <div>TODO: panel 1</div>
        <div>TODO: panel 2</div>
      </template>
    </DTabs>
  `,
});
export const Default = Template.bind({});
