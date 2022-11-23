import { defineComponent, PropType, VNode } from "vue";
import type { Font } from "@darwin-studio/ui-codegen/dist/types/font"; // TODO: shorter path, default export ???
import type { Size } from "@darwin-studio/ui-codegen/dist/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import fontStyles from "@darwin-studio/ui-codegen/dist/styles/font.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import type { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import config from "./config";
import styles from "./index.css?module";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";

/**
 * TODO
 */
export default defineComponent({
  name: config.name,

  props: {
    // TODO: items
    /**
     * Plain string, VNode or HTML if props.enableHtml is true
     */
    label: {
      type: [String, Number, Object] as PropType<Text | VNode>,
    },
    /**
     * You can pass own class name to the <b>label</b> element.
     */
    labelClass: {
      type: String,
    },
    /**
     * Defines font size of the <b>label</b> element. By default depends on props.size
     */
    labelFont: {
      type: String as PropType<Font>,
    },
    /**
     * If not empty renders as an error string below the <b>input</b> element.
     */
    error: {
      type: [String, Number] as PropType<Text>,
    },
    /**
     * You can pass own class name to the <b>error</b> element.
     */
    errorClass: {
      type: String,
    },
    /**
     * Defines font size of the <b>error</b> element. By default depends on props.size
     */
    errorFont: {
      type: String as PropType<Font>,
    },
    /**
     * Defines size of the component
     */
    // TODO: fontSize and size separately ???
    size: {
      type: String as PropType<Size>,
      default: SIZE.TINY, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines container element type of the component
     */
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.FIELDSET,
    },
    /**
     * Enables html string rendering passed in props.label and props.error.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    enableHtml: {
      type: Boolean,
    },

    // TODO: whenChange
  },

  computed: {
    renderLabel(): VNode | null {
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.labelFont || this.size
      );

      const labelClasses = [
        styles[config.labelClassName],
        fontStyles[fontClassName],
        this.labelClass,
      ];

      if (this.$slots.label?.() || this.label) {
        if (this.enableHtml) {
          return <div class={labelClasses} v-html={this.label} />;
        }

        return (
          <div class={labelClasses}>{this.$slots.label?.() || this.label}</div>
        );
      }

      return null;
    },
  },

  // TODO: slots descr
  render(): VNode {
    const Tag = this.tag;

    return (
      <Tag class={styles[config.className]}>
        {this.renderLabel}
        {/*        {this.renderItemList}
        {this.renderError}*/}
      </Tag>
    );
  },
});
