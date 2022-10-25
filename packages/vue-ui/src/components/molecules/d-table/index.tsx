import { defineComponent, PropType, VNode } from "vue";
import type { Padding } from "@darwin-studio/vue-ui-codegen/dist/types/padding"; // TODO: shorter path, default export ???
import { PADDING } from "@darwin-studio/vue-ui-codegen/dist/constants/padding"; // TODO: shorter path, default export ???
import type { Size } from "@darwin-studio/vue-ui-codegen/dist/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import { Text } from "@darwin-studio/vue-ui/src/types/text";
import fontStyles from "@darwin-studio/vue-ui-codegen/dist/styles/font.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import paddingStyles from "@darwin-studio/vue-ui-codegen/dist/styles/padding.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import sizeStyles from "@darwin-studio/vue-ui-codegen/dist/styles/size.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/vue-ui-codegen/config.json";
import config from "./config";
import styles from "./index.css?module";

/**
 * A clickable component which renders as <b>button</b> element, <b>router-link</b> component or <b>a</b> element depending on props.
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * TODO
     */
    headers: {
      type: Array as PropType<Text[] | VNode[]>, // TODO: align, font, special class ???
    },
    /**
     * TODO
     */
    headerRowClass: {
      type: String,
    },
    /**
     * TODO
     */
    headerCellClass: {
      type: String,
    },
    /**
     * TODO
     */
    items: {
      type: Array as PropType<Text[][] | VNode[][]>, // TODO: separators ???
    },
    /**
     * TODO
     */
    itemRowClass: {
      type: String,
    },
    /**
     * TODO
     */
    itemCellClass: {
      type: String,
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
    // TODO: headClassName
    // TODO: bodyClassName
  },

  computed: {
    commonClasses(): string[] {
      // TODO: font and size separately
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.size
      );
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
        fontStyles[fontClassName],
        paddingStyles[paddingSizeClassName],
        paddingStyles[paddingClassName],
        sizeStyles[sizeClassName],
      ];
    },

    // TODO: warn if number of header and item cells a different
    renderHead(): VNode {
      // TODO: enableHtml
      return (
        <thead>
          {/*TODO: what if 2 level of headers with colspan*/}
          <tr class={this.headerRowClass}>
            {/* TODO: slot*/}
            {this.headers?.map((header) => (
              /*TODO: aria*/
              <th
                role="columnheader"
                scope="col"
                aria-label={"TODO"}
                aria-sort="none" // TODO
                class={[this.headerCellClass, ...this.commonClasses]}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
      );
    },
    renderBody(): VNode {
      // TODO: enableHtml
      return (
        <tbody>
          {/* TODO: slot*/}
          {this.items?.map((item) => (
            /*TODO: what if colspan*/
            <tr class={this.itemRowClass}>
              {item?.map((itemCell) => (
                <td class={[this.itemCellClass, ...this.commonClasses]}>
                  {itemCell}
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
        {this.renderHead}
        {this.renderBody}
      </table>
    );
  },
});
