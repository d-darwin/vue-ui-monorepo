import { computed, defineComponent, provide } from "vue";
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
      emit(EVENT_NAME.CHANGE, activeId);
      props.whenChange?.(activeId);
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
  },

  computed: {
    renderTablist(): VNode {
      const TablistTag = this.tablistTag;

      return (
        <TablistTag
          {...config.tablistOptions}
          onKeydown={this.keydownHandler}
          {...this.tablistOptions}
        >
          {this.$slots.tabs?.() || this.tabs}
        </TablistTag>
      );
    },
  },

  methods: {
    // TODO: doesnt work with slots
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
    return (
      <Tag class={config.tabsClass}>
        {this.renderTablist}
        {/*TODO: transition*/}
        {this.$slots.tabpanels?.() || this.tabpanels}
      </Tag>
    );
  },
});
