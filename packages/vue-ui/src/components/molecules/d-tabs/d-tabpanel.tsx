import { defineComponent } from "vue";
import type { VNode } from "vue";
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

  computed: {
    classes(): (string | undefined)[] {
      return [
        generateClass.font(this.size),
        generateClass.outline(config.colorScheme, this.size), // TODO: props
        ...generateClass.padding(this.padding, this.size),
        generateClass.transition(this.transition),
      ];
    },
  },

  render(): VNode {
    const Tag = this.tag;
    /** @slot Use instead of props.content to fully customize content */
    return (
      <Tag
        {...config.tabpanelOptions}
        id={String(this.id)}
        aria-labelledby={String(this.tabId)}
        aria-expanded={this.active || undefined}
        aria-hidden={!this.active || undefined}
        hidden={!this.active || undefined}
        class={this.classes}
      >
        {this.$slots.default?.() || this.content}
      </Tag>
    );
  },
});
