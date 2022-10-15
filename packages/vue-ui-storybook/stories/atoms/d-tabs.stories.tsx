import { ref } from "vue";
import { Story } from "@storybook/vue3";
import {
  DTabs,
  DTab,
  DTabpanel,
} from "@darwin-studio/vue-ui/src/components/atoms/d-tabs";
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
  components: { DTabs, DTab, DTabpanel },
  setup() {
    const activeTab = ref("tab_1");
    return { args, activeTab };
  },
  computed: {
    propSlots() {
      return [
        <DTab
          id="111"
          tabpanel-id="222"
          label="Tab 1"
          active={this.activeTab === "tab_1"}
          whenClick={() => {
            this.activeTab = "tab_1";
          }}
        />,
        <DTab
          label="Tab 2"
          active={this.activeTab === "tab_2"}
          whenClick={() => {
            this.activeTab = "tab_2";
          }}
        />,
      ];
    },
  },
  template: `
    <DTabs
      v-bind="args"
      :tabs="propSlots"
    >
      <template v-slot:tabpanels>
        <DTabpanel id="222" tab-id="111" :active="this.activeTab === 'tab_1'">Panel 1</DTabpanel>
        <DTabpanel :active="this.activeTab === 'tab_2'">Panel 2</DTabpanel>
        <DTabpanel :active="this.activeTab === 'tab_3'">Panel 3</DTabpanel>
      </template>
    </DTabs>
  `,
});
export const Default = Template.bind({});
