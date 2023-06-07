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
    size: {
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
    size: SIZE.MEDIUM, // TODO: don't hardcode values
    tabpanelsFont: FONT.MEDIUM, // TODO: don't hardcode values
    padding: PADDING.DEFAULT, // TODO: don't hardcode values
  },
};

const Template: Story = (args) => ({
  components: { DTabs, DTab, DTabpanel },
  setup() {
    const activeTab = ref(123);
    return { args, activeTab };
  },
  computed: {
    tabs() {
      return [
        <DTab id={123} tabpanelId={111} content="Tab 1" />,
        <DTab id={234} tabpanelId={222} content="Tab 2" />,
      ];
    },
    tabpanels() {
      return [
        <DTabpanel id={111} tabId={123}>
          Tab Panel 1
        </DTabpanel>,
        <DTabpanel id={222} tabId={234}>
          Tab Panel 2
        </DTabpanel>,
      ];
    },
  },
  methods: {
    changeHandler(activeId: string) {
      this.activeTab = activeId;
    },
  },
  template: `
    <DTabs
      v-bind="args"
      :tabs="tabs"
      :tabpanels="tabpanels"
      :activeId="activeTab"
      :whenChange="changeHandler"
    />`,
});
export const Default = Template.bind({});

const TemplateSlots: Story = (args) => ({
  components: { DTabs, DTab, DTabpanel },
  setup() {
    const activeTab = ref("111");
    return { args, activeTab };
  },
  methods: {
    changeHandler(activeId: string) {
      this.activeTab = activeId;
    },
  },
  template: `
    <DTabs v-bind="args" :activeId="activeTab" :whenChange="changeHandler">
      <template v-slot:tabs>
        <DTab id="111" tabpanel-id="222" content="Tab 1" />
        <DTab id="333" content="Tab 2" />
      </template>
      <template v-slot:tabpanels>
        <DTabpanel id="222" tab-id="111">Panel 1</DTabpanel>
        <DTabpanel tab-id="333">Panel 2</DTabpanel>
      </template>
    </DTabs>
  `,
});
export const Slots = TemplateSlots.bind({});
