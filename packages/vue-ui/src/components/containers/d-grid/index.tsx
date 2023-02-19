import { defineComponent, PropType, VNode } from "vue";
import type { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import config from "./config";
import styles from "./index.css?module";

// TODO: descr, naming
//  add grid-column-end: span [col_count]; to the child component styles
//  or add: grid-column-end: span [col_count]; automatic base on child component attr="colCount"???
//  -> via what? scopedSlot ant style, other way and class ???
export default defineComponent({
  name: config.name,

  props: {
    /** TODO
     * Contains number of columns which should take every child node for specific device width.<br>
     * Expected format: { xs: 2, sm: 3, ..., xxl: 4 }.<br>
     * If no column count presented for any breakpoint, nodes will take one cell of the container.
     */
    colSpan: {
      // TODO: more specific type
      type: [String, Object],
      default: () => ({}), // TODO: generate and use Type and CONSTANT
    },
    /**
     * Defines container element type of the component
     */
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.DIV,
    },
  },

  render(): VNode {
    const Tag = this.tag;
    const colSpanStyle = `grid-column-end: span ${this.colSpan || 1};`;

    return (
      <Tag class={styles[config.className]}>{this.$slots.default?.()}</Tag>
    );
  },
});
