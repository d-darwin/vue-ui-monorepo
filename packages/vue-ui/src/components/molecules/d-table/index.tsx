import { defineComponent, PropType, VNode } from "vue";
import type { Padding } from "@darwin-studio/vue-ui-codegen/dist/types/padding"; // TODO: shorter path, default export ???
import { PADDING } from "@darwin-studio/vue-ui-codegen/dist/constants/padding"; // TODO: shorter path, default export ???
import type { Size } from "@darwin-studio/vue-ui-codegen/dist/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import type { Transition } from "@darwin-studio/vue-ui-codegen/dist/types/transition"; // TODO: shorter path, default export ???
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition"; // TODO: shorter path, default export ???
import { Text } from "@darwin-studio/vue-ui/src/types/text";
import fontStyles from "@darwin-studio/vue-ui-codegen/dist/styles/font.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import paddingStyles from "@darwin-studio/vue-ui-codegen/dist/styles/padding.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import sizeStyles from "@darwin-studio/vue-ui-codegen/dist/styles/size.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import transitionStyles from "@darwin-studio/vue-ui-codegen/dist/styles/transition.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/vue-ui-codegen/config.json";
import config from "./config";
import styles from "./index.css?module";

/**
 * TODO
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * TODO:
     */
    headRows: {
      type: Array as PropType<(Text | VNode)[][]>,
    },
    /**
     * TODO
     */
    headClass: {
      type: String,
    },
    /**
     * TODO
     */
    headRowClass: {
      type: String,
    },
    /**
     * TODO
     */
    headCellClass: {
      type: String,
    },
    /**
     * TODO
     */
    headRowAttrs: {
      type: Object as PropType<(rowIndex: number) => Record<string, unknown>>,
    },
    /**
     * TODO
     */
    headCellAttrs: {
      type: Function as PropType<
        (rowIndex: number, colIndex: number) => Record<string, unknown>
      >,
    },
    /**
     * TODO:
     */
    bodyRows: {
      type: Array as PropType<(Text | VNode)[][]>,
    },
    /**
     * TODO
     */
    bodyClass: {
      type: String,
    },
    /**
     * TODO
     */
    bodyRowClass: {
      type: String,
    },
    /**
     * TODO
     */
    bodyCellClass: {
      type: String,
    },
    /**
     * TODO
     */
    bodyRowAttrs: {
      type: Function as PropType<(rowIndex: number) => Record<string, unknown>>,
    },
    /**
     * TODO
     */
    bodyCellAttrs: {
      type: Function as PropType<
        (rowIndex: number, colIndex: number) => Record<string, unknown>
      >,
    },
    /**
     * Defines padding type of the component, use 'equal' if the component contains only an icon
     */
    padding: {
      type: String as PropType<Padding>,
      default: PADDING.DEFAULT, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines size of the component
     */
    size: {
      type: String as PropType<Size>,
      default: SIZE.MEDIUM, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines transition type of the component
     */
    transition: {
      type: String as PropType<Transition>,
      default: TRANSITION.FAST, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Enables html string rendering passed in props.label.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    enableHtml: {
      type: Boolean,
    },
  },

  computed: {
    commonRowClasses(): string[] {
      // TODO: font and size separately
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.size
      );
      const transitionClassName = prepareCssClassName(
        codegenConfig.TOKENS.TRANSITION.CSS_CLASS_PREFIX,
        this.transition
      );

      return [fontStyles[fontClassName], transitionStyles[transitionClassName]];
    },
    commonCellClasses(): string[] {
      const paddingClassName = prepareCssClassName(
        codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
        this.padding
      );
      const paddingSizeClassName = prepareCssClassName(
        codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
        `${this.padding}-${this.size}`
      );
      const sizeClassName = prepareCssClassName(
        codegenConfig.TOKENS.SIZE.CSS_CLASS_PREFIX,
        this.size
      );

      return [
        paddingStyles[paddingSizeClassName],
        paddingStyles[paddingClassName],
        sizeStyles[sizeClassName],
      ];
    },

    // TODO: warn if number of header and item cells a different
    renderHead(): VNode {
      const rowClasses = [
        ...this.commonRowClasses,
        styles[config.rowClassName],
        this.headRowClass,
      ];
      const cellClasses = [...this.commonCellClasses, this.headCellClass];

      /* TODO: slot */

      return (
        <thead class={this.headClass}>
          {/* TODO: keys */}
          {this.headRows?.map((row, rowIndex) => (
            <tr class={rowClasses} {...this.headRowAttrs?.(rowIndex)}>
              {/* TODO: keys */}
              {row?.map((cell, colIndex) =>
                this.enableHtml ? (
                  <th
                    class={cellClasses}
                    {...this.headCellAttrs?.(rowIndex, colIndex)}
                    v-html={cell}
                  />
                ) : (
                  <th
                    class={cellClasses}
                    {...this.headCellAttrs?.(rowIndex, colIndex)}
                  >
                    {cell}
                  </th>
                )
              )}
            </tr>
          ))}
        </thead>
      );
    },
    renderBody(): VNode {
      const rowClasses = [
        ...this.commonRowClasses,
        styles[config.rowClassName],
        this.bodyRowClass,
      ];
      const cellClasses = [...this.commonCellClasses, this.bodyCellClass];

      /* TODO: slot */

      return (
        <tbody class={this.bodyClass}>
          {/* TODO: keys */}
          {this.bodyRows?.map((row, rowIndex) => (
            <tr class={rowClasses} {...this?.bodyRowAttrs?.(rowIndex)}>
              {/* TODO: keys */}
              {row?.map((cell, colIndex) =>
                this.enableHtml ? (
                  <td
                    class={cellClasses}
                    {...this?.bodyCellAttrs?.(rowIndex, colIndex)}
                    v-html={cell}
                  />
                ) : (
                  <td
                    class={cellClasses}
                    {...this?.bodyCellAttrs?.(rowIndex, colIndex)}
                  >
                    {cell}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      );
    },
  },

  render(): VNode {
    return (
      <table class={styles[config.className]}>
        {this.renderHead}
        {this.renderBody}
      </table>
    );
  },
});
