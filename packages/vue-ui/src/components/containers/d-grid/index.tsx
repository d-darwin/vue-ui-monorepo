import {
  CSSProperties,
  defineComponent,
  mergeProps,
  PropType,
  VNode,
} from "vue";
import type { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import useWindowSize from "@darwin-studio/vue-ui/src/compositions/window-size";
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
      type: [Number, Object],
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

  setup() {
    return useWindowSize();
  },

  computed: {
    childComponentsStyles(): CSSProperties {
      let colSpan = config.defaultColSpan;
      if (typeof this.colSpan === "object" && this.colSpan[this.size]) {
        colSpan = this.colSpan[this.size];
      } else if (typeof this.colSpan === "number" && this.colSpan) {
        colSpan = this.colSpan;
      }

      return { gridColumnEnd: `span ${colSpan}` };
    },

    renderContent(): VNode[] | null {
      if (!this.$slots.default) {
        return null;
      }

      return this.$slots.default?.()?.map((child) => {
        const childProps = child.props || {};
        child.props = mergeProps(childProps, {
          style: {
            ...childProps.style,
            ...this.childComponentsStyles,
          },
        });
        return child;
      });
    },
  },

  render(): VNode {
    const Tag = this.tag;

    return <Tag class={styles[config.className]}>{this.renderContent}</Tag>;
  },
});
