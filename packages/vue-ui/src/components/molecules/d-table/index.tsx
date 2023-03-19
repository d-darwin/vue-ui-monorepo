import { defineComponent, mergeProps, type PropType, type VNode } from "vue";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import { DLoaderAsync as DLoader } from "@darwin-studio/vue-ui/src/components/atoms/d-loader/async";
import type { DLoaderProps } from "@darwin-studio/vue-ui/src/components/atoms/d-loader/types";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import getCommonCssClass from "@darwin-studio/vue-ui/src/utils/get-common-css-class";
import { TOKEN_NAME } from "@darwin-studio/vue-ui/src/constants/token-name";
import { LOADER_DEFAULTS } from "./constants";
import config from "./config";
import styles from "./index.css?module";

/**
 * Simply renders <b>table</b> element with passed head and body rows.
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Two-dimensional array of head cells content
     */
    headRows: {
      type: Array as PropType<(Text | VNode)[][]>,
    },
    /**
     * You can pass own class name to the <b>thead</b> element.
     */
    // TODO: options
    headClass: String,
    /**
     * You can pass own class name to the <b>tr</b> elements inside <b>thead</b>.
     */
    // TODO: options
    headRowClass: String,
    /**
     * You can pass own class name to the <b>th</b> elements inside <b>thead</b>.
     */
    // TODO: options
    headCellClass: String,
    /**
     * Pass any attrs to the <b>tr</b> elements inside <b>thead</b>.
     */
    // TODO: options
    headRowAttrs: {
      type: Function as PropType<(rowIndex: number) => Record<string, unknown>>,
    },
    /**
     * Pass any attrs to the <b>th</b> elements inside <b>thead</b>.
     */
    // TODO: options
    headCellAttrs: {
      type: Function as PropType<
        (rowIndex: number, colIndex: number) => Record<string, unknown>
      >,
    },
    /**
     * Two-dimensional array of body cells content
     */
    bodyRows: {
      type: Array as PropType<(Text | VNode)[][]>,
    },
    /**
     * You can pass own class name to the <b>tbody</b> element.
     */
    // TODO: options
    bodyClass: String,
    /**
     * You can pass own class name to the <b>tr</b> elements inside <b>tbody</b>.
     */
    // TODO: options
    bodyRowClass: String,
    /**
     * You can pass own class name to the <b>td</b> elements inside <b>tbody</b>.
     */
    // TODO: options
    bodyCellClass: String,
    /**
     * Pass any attrs to the <b>tr</b> elements inside <b>tbody</b>.
     */
    // TODO: options
    bodyRowAttrs: {
      type: Function as PropType<(rowIndex: number) => Record<string, unknown>>,
    },
    /**
     * Pass any attrs to the <b>td</b> elements inside <b>tbody</b>.
     */
    // TODO: options
    bodyCellAttrs: {
      type: Function as PropType<
        (rowIndex: number, colIndex: number) => Record<string, unknown>
      >,
    },
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
     * Defines if DLoader element should be displayed.
     */
    loading: Boolean,
    /**
     * Pass any DLoader.props to customize it, f.e. { class: "someClass" }
     */
    loaderOptions: generateProp.options<DLoaderProps>(LOADER_DEFAULTS),
  },

  computed: {
    commonRowClasses(): (string | undefined)[] {
      return [
        getCommonCssClass(TOKEN_NAME.FONT, this.size),
        getCommonCssClass(TOKEN_NAME.TRANSITION, this.transition),
      ];
    },

    commonCellClasses(): (string | undefined)[] {
      return [
        getCommonCssClass(TOKEN_NAME.PADDING, this.padding),
        getCommonCssClass(TOKEN_NAME.PADDING, `${this.padding}-${this.size}`),
        getCommonCssClass(TOKEN_NAME.SIZE, this.size),
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
              {row?.map((cell, colIndex) => (
                <th
                  class={cellClasses}
                  {...this.headCellAttrs?.(rowIndex, colIndex)}
                >
                  {cell}
                </th>
              ))}
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
              {row?.map((cell, colIndex) => (
                <td
                  class={cellClasses}
                  {...this?.bodyCellAttrs?.(rowIndex, colIndex)}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      );
    },
  },

  render(): VNode {
    return (
      <table class={styles[config.className]}>
        {this.loading && (
          <DLoader {...mergeProps(LOADER_DEFAULTS, this.loaderOptions)} />
        )}
        {this.renderHead}
        {this.renderBody}
      </table>
    );
  },
});
