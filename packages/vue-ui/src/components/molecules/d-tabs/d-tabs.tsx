import { defineComponent, ref, type PropType, type VNode } from "vue";
import { v4 as uuid } from "uuid";
import { TAG_NAME } from "@darwin-studio/vue-ui/src/constants/tag-name";
import { EVENT_KEY } from "@darwin-studio/vue-ui/src/constants/event-key";
import log, { LOG_TYPE } from "@darwin-studio/vue-ui/src/utils/log";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import config from "./config";
import styles from "./d-tabs.css?module";

/**
 * TODO: description
 */
export default defineComponent({
  name: config.tabsName,

  props: {
    /**
     * Aria label of the tablist
     */
    tablistLabel: generateProp.content(),
    /**
     * You can pass own class name to the tablist container element.
     */
    tablistClass: String,
    /**
     * Array of the DTab components, alternatively you can use slots.tabs
     */
    tabs: {
      type: Array as PropType<VNode[]>, // TODO: more accurate type, what about array of DCheckbox props?
    },
    /**
     * Defines size of the tabs
     */
    tabsSize: generateProp.size(),
    /**
     Array of the DTabpanel components, alternatively you can use slots.tabpanels
     */
    tabpanels: {
      type: Array as PropType<VNode[]>, // TODO: more accurate type
    },
    /**
     * Defines font size of the tabpanels
     */
    tabpanelsFont: generateProp.font(),
    /**
     * Pass true to disable <b>DTab</b> element.
     */
    disabled: Boolean,
    /**
     * Defines padding type of the component, use 'equal' if the component contains only an icon
     */
    padding: generateProp.padding(),
    /**
     * Defines transition type of the component
     */
    transition: generateProp.transition(),
    /**
     * Defines element type of the container component
     */
    tag: generateProp.tag(),
    /**
     * Defines element type of the tablist component
     */
    tablistTag: generateProp.tag(TAG_NAME.UL),
    /**
     * Defines should DTabs be activated on arrow navigation
     */
    activateOnKeys: Boolean,
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
          props.tabpanels?.[index]?.props?.id ||
          slotTabpanels?.[index]?.props?.id ||
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

      if (event.key === EVENT_KEY.ArrowLeft) {
        event.preventDefault();
        const prevIndex = tabIndex === 0 ? tabs?.length - 1 : tabIndex - 1;
        // TODO: find out more elegant way
        tabs?.[prevIndex]?.el?.focus?.();
      }
      if (event.key === EVENT_KEY.ArrowRight) {
        event.preventDefault();
        const nextIndex = tabIndex === tabs?.length - 1 ? 0 : tabIndex + 1;
        // TODO: find out more elegant way
        tabs?.[nextIndex]?.el?.focus?.();
      }
      if (event.key === EVENT_KEY.Enter) {
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
