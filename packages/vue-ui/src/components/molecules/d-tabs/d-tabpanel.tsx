import { defineComponent, inject } from "vue";
import type { VNode } from "vue";
import type {
  CommonProps,
  DTabsProvided,
} from "@darwin-studio/vue-ui/src/components/molecules/d-tabs/types";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
import config from "./config";

export default defineComponent({
  name: config.tabpanelName,

  props: {
    /**
     * Plain string or VNode
     */
    content: generateProp.content(),
    /**
     * Pass if the component is active
     */
    active: Boolean,
    /**
     * Defines <i>id</i> attr of the component
     */
    id: generateProp.text(),
    /**
     * Defines <i>id</i> attr of the corresponding DTab component
     */
    tabId: generateProp.text(), // TODO: try not to use

    // TODO: dTabsProvided
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
     * Defines element type of the container component
     */
    tag: generateProp.tag(config.tabpanelTag),
  },

  setup() {
    return {
      injection: inject<DTabsProvided>(config.provideInjectKey, {}),
    };
  },

  computed: {
    commonProps(): CommonProps {
      return {
        disabled: this.injection.disabled || false,
        padding: this.injection.padding || this.padding,
        // TODO rounding: this.injection.rounding || this.rounding,
        size: this.injection.size || this.size,
        transition: this.injection.transition || this.transition,
      };
    },

    classes(): (string | undefined)[] {
      return [
        generateClass.font(this.commonProps.size),
        generateClass.outline(config.colorScheme, this.commonProps.size), // TODO: props
        ...generateClass.padding(
          this.commonProps.padding,
          this.commonProps.size
        ),
        generateClass.transition(this.commonProps.transition),
      ];
    },
  },

  render(): VNode {
    const Tag = this.tag;
    /** @slot Use instead of props.content to fully customize content */
    return (
      <Tag
        {...config.tabpanelOptions}
        // TODO: key !!!
        id={this.id ? String(this.id) : undefined}
        aria-labelledby={this.tabId ? String(this.tabId) : undefined}
        aria-expanded={this.active || undefined} // TODO: watch on injection.activeId???
        aria-hidden={!this.active || undefined} // TODO: watch on injection.activeId???
        hidden={!this.active || undefined} // TODO: watch on injection.activeId???
        class={this.classes}
      >
        {this.$slots.default?.() || this.content}
      </Tag>
    );
  },
});
