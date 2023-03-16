import { defineComponent, mergeProps, type PropType, type VNode } from "vue";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import fontStyles from "@darwin-studio/ui-codegen/dist/styles/font.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import paddingStyles from "@darwin-studio/ui-codegen/dist/styles/padding.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import sizeStyles from "@darwin-studio/ui-codegen/dist/styles/size.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import transitionStyles from "@darwin-studio/ui-codegen/dist/styles/transition.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import { DLoaderAsync as DLoader } from "@darwin-studio/vue-ui/src/components/atoms/d-loader/async";
import type { DLoaderProps } from "@darwin-studio/vue-ui/src/components/atoms/d-loader/types";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
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
      type: Object as PropType<(rowIndex: number) => Record<string, unknown>>,
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
    bodyClass: {
      type: String,
    },
    /**
     * You can pass own class name to the <b>tr</b> elements inside <b>tbody</b>.
     */
    // TODO: options
    bodyRowClass: {
      type: String,
    },
    /**
     * You can pass own class name to the <b>td</b> elements inside <b>tbody</b>.
     */
    // TODO: options
    bodyCellClass: {
      type: String,
    },
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
    /**
     * Enables html string rendering passed in props.headRows and props.bodyRows.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    // TODO: remove
    enableHtml: Boolean,
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
        {this.loading && (
          <DLoader {...mergeProps(this.loaderOptions, LOADER_DEFAULTS)} />
        )}
        {this.renderHead}
        {this.renderBody}
      </table>
    );
  },
});
