import { ref } from "vue";
import { Story } from "@storybook/vue3";
import {
  DTabs,
  DTab,
  DTabpanel,
} from "@darwin-studio/vue-ui/src/components/molecules/d-tabs";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";

export default {
  title: "molecules/DTabs",
  component: DTabs,
  argTypes: {
    tabsSize: {
      control: { type: "select" },
      options: Object.values(SIZE),
    },
    tabpanelsFont: {
      control: { type: "select" },
      options: Object.values(FONT),
    },
    padding: {
      control: { type: "select" },
      options: Object.values(PADDING),
    },
    transition: {
      control: { type: "select" },
      options: Object.values(TRANSITION),
    },
  },
  args: {
    tabsSize: SIZE.MEDIUM, // TODO: don't hardcode values
    tabpanelsFont: FONT.MEDIUM,
    padding: PADDING.DEFAULT, // TODO: don't hardcode values
  },
};

const Template: Story = (args) => ({
  components: { DTabs, DTab, DTabpanel },
  setup() {
    const activeTab = ref("tab_1");
    return { args, activeTab };
  },
  computed: {
    tabs() {
      return [
        <DTab
          id="111"
          tabpanel-id="222"
          content="Tab 1"
          active={this.activeTab === "tab_1"}
          whenClick={() => {
            this.activeTab = "tab_1";
          }}
        />,
        <DTab
          content="Tab 2"
          active={this.activeTab === "tab_2"}
          whenClick={() => {
            this.activeTab = "tab_2";
          }}
        />,
      ];
    },
    tabpanels() {
      return [
        <DTabpanel id="222" tab-id="111" active={this.activeTab === "tab_1"}>
          Panel 1
        </DTabpanel>,
        <DTabpanel active={this.activeTab === "tab_2"}>Panel 2</DTabpanel>,
      ];
    },
  },
  template: `<DTabs v-bind="args" :tabs="tabs" :tabpanels="tabpanels" />`,
});
export const Default = Template.bind({});

const TemplateSlots: Story = (args) => ({
  components: { DTabs, DTab, DTabpanel },
  setup() {
    const activeTab = ref("tab_1");
    return { args, activeTab };
  },
  template: `
    <DTabs v-bind="args">
      <template v-slot:tabs>
        <DTab id="111" tabpanel-id="222" content="Tab 1" :active="this.activeTab === 'tab_1'" :whenClick="() => {this.activeTab = 'tab_1'}" />
        <DTab content="Tab 2" :active="this.activeTab === 'tab_2'" :whenClick="() => {this.activeTab = 'tab_2'}" />
      </template>
      <template v-slot:tabpanels>
        <DTabpanel id="222" tab-id="111" :active="this.activeTab === 'tab_1'">Panel 1</DTabpanel>
        <DTabpanel :active="this.activeTab === 'tab_2'">Panel 2</DTabpanel>
      </template>
    </DTabs>
  `,
});
export const Slots = TemplateSlots.bind({});
