import { computed, defineComponent, provide, ref, Ref } from "vue";
import type { HTMLAttributes, VNode, PropType, ComputedRef } from "vue";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import { EVENT_KEY } from "@darwin-studio/vue-ui/src/constants/event-key";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import { DTabsProvided } from "./types";
import config from "./config";

/**
 * TODO: description
 */
export default defineComponent({
  name: config.tabsName,

  props: {
    /**
     * Array of the DTab components, alternatively you can use slots.tabs
     */
    tabs: generateProp.array<VNode>(), // TODO: more accurate type, what about array of DCheckbox props?,
    // TODO: tabTag
    /**
     * TODO
     */
    activeId: generateProp.text(),
    /**
     Array of the DTabpanel components, alternatively you can use slots.tabpanels
     */
    tabpanels: generateProp.array<VNode>(), // TODO: more accurate type
    // TODO: tabpanelTag
    /**
     * Pass true to disable <b>DTab</b> element.
     */
    /**
     * Pass any attribute to the tablist element
     */
    tablistOptions: generateProp.options<HTMLAttributes>(config.tablistOptions),
    /**
     * Defines element type of the tablist component
     */
    tablistTag: generateProp.tag(config.tablistTag), // TODO ???

    // TODO: dTabsProvided
    disabled: Boolean,
    /**
     * Defines padding type of the component, use 'equal' if the component contains only an icon
     */
    padding: generateProp.padding(),
    /**
     * Defines size of the component
     */
    size: generateProp.size(),
    /**
     * Defines transition type of the component
     */
    transition: generateProp.transition(),

    /**
     * Defines should DTabs be activated on arrow navigation
     */
    activateOnArrows: Boolean,
    /**
     * Defines element type of the container component
     */
    tag: generateProp.tag(),

    /**
     * Alternative way to catch change event with current active tab id in the payload
     */
    whenChange: Function as PropType<(activeId: Text) => void | Promise<void>>,
  },

  setup(props, { emit }) {
    const whenChange = (activeId: Text) => {
      if (!props.disabled) {
        /**
         * Emits on click with active tab id payload
         * @event click
         * @type {activeId: Text}
         */
        emit(EVENT_NAME.CHANGE, activeId);
        // TODO: test case
        props.whenChange?.(activeId);
      }
    };

    // TODO: test case
    provide<ComputedRef<DTabsProvided>>(
      config.provideInjectKey,
      computed(() => ({
        disabled: props.disabled,
        // TODO colorScheme: props.colorScheme,
        padding: props.padding,
        // TODO rounding: props.rounding,
        size: props.size,
        transition: props.transition,
        activeId: props.activeId,
        whenChange,
      }))
    );

    const tablistRef: Ref<HTMLElement | null> = ref(null);
    return {
      [config.tablistRef]: tablistRef,
    };
  },

  methods: {
    async keydownHandler(event: KeyboardEvent): Promise<void> {
      const tabs = this.$slots.tabs?.() || this.tabs;
      // there is no sense to navigate in one tab
      if (!tabs || tabs.length < 2) {
        return;
      }

      let currentTabId = (event.target as HTMLElement).getAttribute("id"); // TODO: avoid casting
      const currentTabIndex = tabs.findIndex(
        (tab) => String(tab?.props?.id) === String(currentTabId)
      );
      // get actual id with type
      currentTabId = tabs[currentTabIndex]?.props?.id;

      if (event.key === EVENT_KEY.ArrowLeft) {
        // TODO ??? event.preventDefault();
        const prevIndex =
          currentTabIndex === 0 ? tabs?.length - 1 : currentTabIndex - 1;
        const tabElements = (this.$refs[config.tablistRef] as HTMLElement) // TODO: avoid casting
          ?.children;
        (tabElements?.[prevIndex] as HTMLElement)?.focus?.(); // TODO: avoid casting
      }

      if (event.key === EVENT_KEY.ArrowRight) {
        // TODO ??? event.preventDefault();
        const nextIndex =
          currentTabIndex === tabs?.length - 1 ? 0 : currentTabIndex + 1;
        const tabElements = (this.$refs[config.tablistRef] as HTMLElement) // TODO: avoid casting
          ?.children;
        (tabElements?.[nextIndex] as HTMLElement)?.focus?.(); // TODO: avoid casting
      }

      // TODO: test case
      if (event.key === EVENT_KEY.Enter) {
        if (currentTabId) {
          this.whenChange?.(currentTabId);
        }
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
      <Tag class={config.tabsClass}>
        <TablistTag
          {...config.tablistOptions}
          ref={config.tablistRef}
          onKeydown={this.keydownHandler}
          {...this.tablistOptions}
        >
          {this.$slots.tabs?.() || this.tabs}
        </TablistTag>
        {/*TODO: transition*/}
        {/*TODO: keep-alive*/}
        {this.$slots.tabpanels?.() || this.tabpanels}
      </Tag>
    );
  },
});
