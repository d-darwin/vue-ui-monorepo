import { defineComponent } from "vue";
import type { HTMLAttributes, VNode } from "vue";
import { v4 as uuid } from "uuid";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
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
    id: generateProp.text(() => uuid()),
    /**
     * Defines <i>id</i> attr of the corresponding DTab component
     */
    tabId: generateProp.text(() => uuid()),
    /**
     * Defines font size of the component
     */
    font: generateProp.font(),
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
  },

  computed: {
    classes(): (string | undefined)[] {
      return [
        generateClass.font(this.font),
        generateClass.outline(COLOR_SCHEME.PRIMARY, SIZE.MEDIUM), // TODO: config or props
        ...generateClass.padding(this.padding, this.font),
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
