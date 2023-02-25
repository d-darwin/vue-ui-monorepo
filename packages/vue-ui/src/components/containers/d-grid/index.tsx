import { defineComponent, mergeProps, PropType, VNode } from "vue";
import { Breakpoints } from "@darwin-studio/ui-codegen/dist/types/breakpoints";
import type { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import useWindowSize from "@darwin-studio/vue-ui/src/compositions/window-size";
import config from "./config";
import styles from "./index.css?module";

// TODO: descr, naming
export default defineComponent({
  name: config.name,

  props: {
    // TODO: content to use instead of $slots.default ???
    /**
     * Contains number of columns which should take every child node for specific device width.<br>
     * Expected format: number or { xs: 2, sm: 3, ..., xl: 4 }.<br>
     * By default children will take one column.
     */
    colSpan: {
      type: [Number, Object] as PropType<
        number | Record<Breakpoints | "", number>
      >,
    },
    /**
     * Contains row gap between cells.<br>
     * Expected format: '16px' or { xs: '10px', sm: '16px', ..., xl: '24px' }.<br>
     * By default equals to column gap of the grid.
     */
    rowGap: {
      type: [String, Object] as PropType<
        string | Record<Breakpoints | "", string>
      >,
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
      const deviceSize = this.size;
      if (typeof this.colSpan === "object" && this.colSpan[deviceSize]) {
        colSpan = this.colSpan[deviceSize];
      } else if (typeof this.colSpan === "number" && this.colSpan) {
        colSpan = this.colSpan;
      }

      return colSpan;
    },

    preparedRowGap(): string {
      let rowGap = config.defaultRowGap;
      const deviceSize = this.size;
      if (typeof this.rowGap === "object" && this.rowGap[deviceSize]) {
        rowGap = this.rowGap[deviceSize];
      } else if (typeof this.rowGap === "string" && this.rowGap) {
        rowGap = this.rowGap;
      }

      return rowGap;
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
