import { defineComponent, mergeProps } from "vue";
import type { HTMLAttributes, PropType, VNode } from "vue";
import type { Breakpoints } from "@darwin-studio/ui-codegen/dist/types/breakpoints";
import useWindowSize from "@darwin-studio/vue-ui/src/compositions/window-size";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
import config from "./config";

/**
 * The container provides you with an easy way to arrange child nodes in a grid template.
 *
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * An array of strings or VNodes
     */
    content: {
      type: Array as PropType<(string | VNode)[]>,
    },
    /**
     * Contains number of columns which should take every child node for specific device width.<br>
     * Expected format: number or { xs: 2, sm: 3, ..., xl: 4 }.<br>
     * By default children will take one column.
     */
    colSpan: {
      type: [Number, Object] as PropType<number | Record<Breakpoints, number>>,
    },
    /**
     * Contains row gap between cells.<br>
     * Expected format: '16px' or { xs: '10px', sm: '16px', ..., xl: '24px' }.<br>
     * By default equals to column gap of the grid.
     */
    rowGap: {
      type: [String, Object] as PropType<string | Record<Breakpoints, string>>,
    },
    /**
     * Defines container element type of the component
     */
    tag: generateProp.tag(),
    /**
     * Defines transition type of the component
     */
    transition: generateProp.transition(),
  },

  setup() {
    return useWindowSize();
  },

  computed: {
    preparedColSpan(): number {
      let colSpan = config.colSpan;
      if (
        typeof this.colSpan === "object" &&
        this.size &&
        this.colSpan[this.size]
      ) {
        colSpan = this.colSpan[this.size];
      } else if (typeof this.colSpan === "number" && this.colSpan) {
        colSpan = this.colSpan;
      }

      return colSpan;
    },

    preparedRowGap(): string {
      let rowGap = config.rowGap;
      if (
        typeof this.rowGap === "object" &&
        this.size &&
        this.rowGap[this.size]
      ) {
        rowGap = this.rowGap[this.size];
      } else if (typeof this.rowGap === "string" && this.rowGap) {
        rowGap = this.rowGap;
      }

      return rowGap;
    },

    bindings(): HTMLAttributes {
      return {
        class: [config.class, generateClass.transition(this.transition)],
        style: {
          "--grid-col-span": this.preparedColSpan, // TODO: config
          "--grid-row-gap": this.preparedRowGap, // TODO: config
        },
      };
    },

    renderContent(): (VNode | string)[] | undefined {
      if (this.$slots.default) {
        // TODO: find out another way ...
        return this.$slots.default()?.map((child) => {
          child.props = mergeProps(child.props || {}, {
            class: config.childClass,
          });
          return child;
        });
      }

      if (this.content) {
        // TODO: find out another way ...
        return this.content.map((child) => {
          if (typeof child !== "string") {
            child.props = mergeProps(child.props || {}, {
              class: config.childClass,
            });
            return child;
          }

          return child;
        });
      }

      return undefined;
    },
  },

  /*TODO: why vue-docgen cant' detect not default slots ???*/
  /**
   * @slot $slots.default
   * Put some children to align them with the grid
   * */
  render(): VNode {
    const Tag = this.tag;

    return <Tag {...this.bindings}>{this.renderContent}</Tag>;
  },
});
