import {
  defineComponent,
  mergeProps,
  type HTMLAttributes,
  type PropType,
  type VNode,
} from "vue";
import type { Transition } from "@darwin-studio/ui-codegen/dist/types/transition"; // TODO: shorter path, default export ???
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition"; // TODO: shorter path, default export ???
import type { Breakpoints } from "@darwin-studio/ui-codegen/dist/types/breakpoints";
import transitionStyles from "@darwin-studio/ui-codegen/dist/styles/transition.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import type { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import useWindowSize from "@darwin-studio/vue-ui/src/compositions/window-size";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import config from "./config";
import styles from "./index.css?module";

/**
 * The container provides you with an easy way to arrange child nodes in a grid template.
 *
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * An array of VNodes or HTML strings if props.enableHtml is true
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
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.DIV,
    },
    /**
     * Defines transition type of the component
     */
    transition: {
      type: String as PropType<Transition>,
      default: TRANSITION.FAST, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Enables html string rendering passed in props.content.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    enableHtml: {
      type: Boolean,
    },
  },

  setup() {
    return useWindowSize();
  },

  computed: {
    preparedColSpan(): number {
      let colSpan = config.defaultColSpan;
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
      let rowGap = config.defaultRowGap;
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
      const transitionClassName = prepareCssClassName(
        codegenConfig.TOKENS.TRANSITION.CSS_CLASS_PREFIX,
        this.transition
      );

      return {
        class: [
          styles[config.className],
          transitionStyles[transitionClassName],
        ],
        style: {
          "--grid-col-span": this.preparedColSpan,
          "--grid-row-gap": this.preparedRowGap,
        },
      };
    },

    renderContent(): (VNode | string)[] | undefined {
      if (this.$slots.default) {
        return this.$slots.default()?.map((child) => {
          child.props = mergeProps(child.props || {}, {
            class: styles[config.childClassName],
          });
          return child;
        });
      }

      if (this.content) {
        return this.content.map((child) => {
          if (typeof child !== "string") {
            child.props = mergeProps(child.props || {}, {
              class: styles[config.childClassName],
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

    if (!this.enableHtml || !this.content) {
      return <Tag {...this.bindings}>{this.renderContent}</Tag>;
    }

    return <Tag {...this.bindings} v-html={this.content.join("")} />;
  },
});
