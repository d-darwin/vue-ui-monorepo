import { defineComponent, mergeProps, PropType, VNode } from "vue";
import { Breakpoints } from "@darwin-studio/ui-codegen/dist/types/breakpoints";
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
    /**
     * Contains number of columns which should take every child node for specific device width.<br>
     * Expected format: number or { xs: 2, sm: 3, ..., xxl: 4 }.<br>
     * By default children will take one column.
     */
    colSpan: {
      type: [Number, Object] as PropType<number | Record<Breakpoints, number>>,
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
    preparedColSpan(): number {
      let colSpan = config.defaultColSpan;
      const deviceSize = this.size as Breakpoints; // TODO: how to avoid casting ??
      if (typeof this.colSpan === "object" && this.colSpan[deviceSize]) {
        colSpan = this.colSpan[deviceSize];
      } else if (typeof this.colSpan === "number" && this.colSpan) {
        colSpan = this.colSpan;
      }

      return colSpan;
    },

    preparedRowGap(): string {
      // TODO
      return "10px";
    },
  },

  render(): VNode {
    const Tag = this.tag;

    return (
      <Tag
        class={styles[config.className]}
        style={{
          "--grid-col-span": this.preparedColSpan,
          "--grid-row-gap": this.preparedRowGap,
        }}
      >
        {this.$slots.default?.()?.map((child) => {
          child.props = mergeProps(child.props || {}, { class: styles.child });
          return child;
        })}
      </Tag>
    );
  },
});
