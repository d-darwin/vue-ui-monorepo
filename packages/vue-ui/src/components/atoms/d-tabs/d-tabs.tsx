import { defineComponent, PropType, VNode } from "vue";
import type { Padding } from "@darwin-studio/vue-ui-codegen/dist/types/padding"; // TODO: shorter path, default export ???
import { PADDING } from "@darwin-studio/vue-ui-codegen/dist/constants/padding"; // TODO: shorter path, default export ???
import type { Size } from "@darwin-studio/vue-ui-codegen/dist/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import type { Transition } from "@darwin-studio/vue-ui-codegen/dist/types/transition"; // TODO: shorter path, default export ???
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition"; // TODO: shorter path, default export ???
import type { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import config from "./config";
import styles from "./d-tabs.css?module";

export default defineComponent({
  name: config.tabsName,

  props: {
    /**
     * TODO
     */
    tablistLabel: {
      type: [String || Number] as PropType<Text>,
    },
    /**
     * TODO
     */
    tablistClass: {
      type: String,
    },
    // TODO: tabs: Text | VNode
    // TODO: tabs class
    // TODO: tabs font

    // TODO: tabpanels: Text | VNode
    // TODO: tabs class
    // TODO: tabs font
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
     * Defines size of the component
     */
    // TODO: fontSize and size separately ???
    size: {
      type: String as PropType<Size>,
      default: SIZE.MEDIUM, // TODO: gent defaults base on actual values, not hardcoded
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
     * Enables html string rendering passed in props.label.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    enableHtml: {
      type: Boolean,
    },
    // TODO: emit change ???
  },

  setup(props) {
    // TODO: prepare ids
  },

  /*TODO: why vue-docgen cant' detect not default slots ???*/
  /**
   * @slot tabs
   * Use to place DTab components
   * */
  /**
   * @slot tabpanels
   * Use to place DTabpanel components
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
        >
          {this.$slots.tabs?.().map((tab) => {
            Object.assign(tab.props || {}, {
              disabled: tab.props?.disabled || this.disabled,
              padding: tab.props?.padding || this.padding,
              size: tab.props?.size || this.size,
              transition: tab.props?.transition || this.transition,
              enableHtml: tab.props?.enableHtml || this.enableHtml,
            });
            return tab;
          })}
        </TablistTag>

        {/*TODO: if different number of tabs and tabpanels*/}
        {this.$slots.tabpanels?.().map((tabpanel) => {
          Object.assign(tabpanel.props || {}, {
            font: tabpanel.props?.font || this.size, // TODO: isnt a good idea...
            padding: tabpanel.props?.padding || this.padding,
            transition: tabpanel.props?.transition || this.transition,
            enableHtml: tabpanel.props?.enableHtml || this.enableHtml,
          });
          return tabpanel;
        })}
      </Tag>
    );
  },
});
