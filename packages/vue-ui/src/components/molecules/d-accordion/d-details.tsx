import { defineComponent, VNode } from "vue";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import config from "./config";
import styles from "./d-details.css?module";

/**
 * TODO
 */
export default defineComponent({
  name: config.detailsName,

  props: {
    /**
     * Plain string or VNode
     */
    summary: generateProp.content(),
    /**
     * Plain string or VNode
     */
    content: generateProp.content(),
    /**
     * Defines container element type of the component
     */
    tag: generateProp.tag(TAG_NAME_DEFAULTS.DETAILS), // TODO: ???
    // TODO: summaryTag ???
    // TODO: contentTag ???
  },

  render(): VNode {
    const Tag = this.tag;

    return (
      <Tag class={styles[config.detailsClassName]}>
        <summary>{this.$slots.summary?.() || this.summary}</summary>
        <div>{this.$slots.default?.() || this.content}</div>
        {/*TODO: or whole content including summary ???*/}
      </Tag>
    );
  },
});
