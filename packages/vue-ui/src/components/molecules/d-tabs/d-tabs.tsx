import { defineComponent, PropType, VNode, ref } from "vue";
import { v4 as uuid } from "uuid";
import type { Font } from "@darwin-studio/ui-codegen/dist/types/font"; // TODO: shorter path, default export ???
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font"; // TODO: shorter path, default export ???
import type { Padding } from "@darwin-studio/ui-codegen/dist/types/padding"; // TODO: shorter path, default export ???
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding"; // TODO: shorter path, default export ???
import type { Size } from "@darwin-studio/ui-codegen/dist/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import type { Transition } from "@darwin-studio/ui-codegen/dist/types/transition"; // TODO: shorter path, default export ???
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition"; // TODO: shorter path, default export ???
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import log, { LOG_TYPE } from "@darwin-studio/vue-ui/src/utils/log";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import type { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import config from "./config";
import styles from "./d-tabs.css?module";

// TODO: description
export default defineComponent({
  name: config.tabsName,

  props: {
    /**
     * Aria label of the tablist
     */
    tablistLabel: {
      type: [String || Number] as PropType<Text>,
    },
    /**
     * You can pass own class name to the tablist container element.
     */
    tablistClass: {
      type: String,
    },
    /**
     * Array of the DTab components, alternatively you can use slots.tabs
     */
    tabs: {
      type: Array as PropType<VNode[]>, // TODO: more accurate type, what about array of DCheckbox props?
    },
    /**
     * Defines size of the tabs
     */
    tabsSize: {
      type: String as PropType<Size>,
      default: SIZE.MEDIUM, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     Array of the DTabpanel components, alternatively you can use slots.tabpanels
     */
    tabpanels: {
      type: Array as PropType<VNode[]>, // TODO: more accurate type
    },
    /**
     * Defines font size of the tabpanels
     */
    tabpanelsFont: {
      type: String as PropType<Font>,
      default: FONT.MEDIUM, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Pass true to disable <b>DTab</b> element.
     */
    disabled: {
      type: Boolean,
    },
    /**
     * Defines padding type of the component, use 'equal' if the component contains only an icon
     */
    padding: {
      type: String as PropType<Padding>,
      default: PADDING.DEFAULT, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines transition type of the component
     */
    transition: {
      type: String as PropType<Transition>,
      default: TRANSITION.FAST, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines element type of the container component
     */
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.DIV,
    },
    /**
     * Defines element type of the tablist component
     */
    tablistTag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.UL,
    },
    /**
     * Defines should DTabs be activated on arrow navigation
     */
    activateOnKeys: {
      type: Boolean,
    },
    /**
     * Enables html string rendering passed in props.tabs and props.tabpanels.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    enableHtml: {
      type: Boolean,
    },
  },

  setup(props, { slots }) {
    const slotTabs = slots.tabs?.();
    const slotTabpanels = slots.tabpanels?.();
    const tabsLength = props.tabs?.length || slotTabs?.length;
    const tabpanelsLength = props.tabpanels?.length || slotTabpanels?.length;
    if (tabpanelsLength && tabpanelsLength !== tabsLength) {
      log("Number of tabs and tabpanels are different", LOG_TYPE.WARN);
    }

    const ids: { tabId: Text; tabpanelId: Text }[] = [];
    // TODO: reactivity doesnt work - fix it !!!
    (props.tabs || slotTabs)?.forEach((tab, index) => {
      ids.push({
        tabId: tab.props?.id || uuid(),
        tabpanelId:
          slotTabpanels?.[index]?.props?.id ||
          props.tabpanels?.[index]?.props?.id ||
          tab.props?.tabpanelId ||
          uuid(),
      });
    });

    return { ids: ref(ids) };
  },

  computed: {
    renderTabs(): VNode[] {
      const prepareProps = (tab: VNode, index: number) => {
        Object.assign(tab.props || {}, {
          id: this.ids?.[index]?.tabId,
          tabpanelId: this.ids?.[index]?.tabpanelId,
          disabled:
            typeof tab.props?.disabled === "undefined"
              ? this.disabled
              : tab.props?.disabled,
          padding: tab.props?.padding || this.padding,
          size: tab.props?.size || this.tabsSize,
          transition: tab.props?.transition || this.transition,
          enableHtml:
            typeof tab.props?.enableHtml === "undefined"
              ? this.enableHtml
              : tab.props?.enableHtml,
        });
        tab.key = tab.key || tab.props?.id;
        return tab;
      };

      if (this.tabs?.length) {
        return this.tabs.map(prepareProps);
      }

      return this.$slots.tabs?.().map(prepareProps) || [];
    },

    renderTabpanels(): VNode[] {
      const prepareProps = (tabpanel: VNode, index: number) => {
        Object.assign(tabpanel.props || {}, {
          id: this.ids?.[index]?.tabpanelId,
          tabId: this.ids?.[index]?.tabId,
          font: tabpanel.props?.font || this.tabpanelsFont,
          padding: tabpanel.props?.padding || this.padding,
          transition: tabpanel.props?.transition || this.transition,
          enableHtml:
            typeof tabpanel.props?.enableHtml === "undefined"
              ? this.enableHtml
              : tabpanel.props?.enableHtml,
        });
        tabpanel.key = tabpanel.key || tabpanel.props?.id;
        return tabpanel;
      };

      if (this.tabpanels?.length) {
        return this.tabpanels.map(prepareProps);
      }

      return this.$slots.tabpanels?.().map(prepareProps) || [];
    },
  },

  methods: {
    async keydownHandler(event: KeyboardEvent): Promise<void> {
      // TODO: dont calc if not in array
      const tabs = (this.tabs?.length ? this.tabs : this.$slots.tabs?.()) || [];
      const tabId = (event.target as HTMLElement).getAttribute("id");
      const tabIndex = tabs.findIndex((tab) => tab?.props?.id === tabId);

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        const prevIndex = tabIndex === 0 ? tabs?.length - 1 : tabIndex - 1;
        // TODO: find out more elegant way
        tabs?.[prevIndex]?.el?.focus?.();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        const nextIndex = tabIndex === tabs?.length - 1 ? 0 : tabIndex + 1;
        // TODO: find out more elegant way
        tabs?.[nextIndex]?.el?.focus?.();
      }
      if (event.key === "Enter") {
        event.preventDefault();
        // TODO: find out more elegant way
        tabs?.[tabIndex]?.props?.whenClick?.();
      }
    },
  },

  /*TODO: why vue-docgen cant' detect not default slots ???*/
  /**
   * @slot slots.tabs
   * Use instead of props.tabs to place DTab components
   * */
  /**
   * @slot slots.tabpanels
   * Use instead of props.tabpanels to place DTabpanel components
   * */
  render(): VNode {
    const Tag = this.tag;
    const TablistTag = this.tablistTag;

    return (
      <Tag class={styles[config.tabsClassName]}>
        <TablistTag
          role="tablist"
          aria-label={String(this.tablistLabel)}
          class={[styles[config.tablistClassName], this.tablistClass]}
          onKeydown={this.keydownHandler}
        >
          {this.renderTabs}
        </TablistTag>

        {/*TODO: transition*/}
        {this.renderTabpanels}
      </Tag>
    );
  },
});
