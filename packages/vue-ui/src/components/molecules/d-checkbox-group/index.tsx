import { defineComponent, type PropType, type VNode } from "vue";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import fontStyles from "@darwin-studio/ui-codegen/dist/styles/font.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import config from "./config";
import styles from "./index.css?module";

/**
 * Renders group of the DCheckbox components with label and error
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Array of the DCheckbox components, alternatively you can use default slot
     */
    items: {
      type: Array as PropType<VNode[]>, // TODO: more accurate type, what about array of DCheckbox props?
    },
    /**
     * Plain string, VNode or HTML if props.enableHtml is true
     */
    label: generateProp.content(),
    /**
     * You can pass own class name to the <b>label</b> element.
     */
    // TODO: labelOptions
    labelClass: String,
    /**
     * Defines font size of the <b>label</b> element. By default depends on props.size
     */
    // TODO: labelOptions
    labelFont: generateProp.font(),
    /**
     * If not empty renders as an error string below the <b>input</b> element.
     */
    error: generateProp.content(),
    /**
     * You can pass own class name to the <b>error</b> element.
     */
    // TODO: errorOptions
    errorClass: String,
    /**
     * Defines font size of the <b>error</b> element. By default depends on props.size
     */
    // TODO: errorOptions
    errorFont: generateProp.font(undefined, true),
    /**
     * Pass true to disable <b>input</b> element.
     */
    disabled: Boolean,
    /**
     * Defines appearance of the component
     */
    colorScheme: generateProp.colorScheme(COLOR_SCHEME.SECONDARY),
    /**
     * Defines corner rounding of the icon container element
     */
    rounding: generateProp.rounding(),
    /**
     * Defines size of the component
     */
    // TODO: fontSize and size separately ???
    size: generateProp.size(SIZE.TINY),
    /**
     * Defines transition type of the component
     */
    transition: generateProp.transition(),
    /**
     * Defines container element type of the component
     */
    tag: generateProp.tag(TAG_NAME_DEFAULTS.FIELDSET),
    /**
     * Enables html string rendering passed in props.label and props.error.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    // TODO: remove
    enableHtml: Boolean,

    // TODO: whenChange\WhenInput
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
          return <legend class={labelClasses} v-html={this.label} />;
        }

        return (
          /*TODO: customizable tag*/
          <legend class={labelClasses}>
            {this.$slots.label?.() || this.label}
          </legend>
        );
      }

      return null;
    },

    renderItemList(): VNode[] {
      const prepareProps = (checkbox: VNode) => {
        Object.assign(checkbox.props || {}, {
          class: [styles[config.checkboxClassName], checkbox.props?.class],
          disabled:
            typeof checkbox.props?.disabled === "undefined"
              ? this.disabled
              : checkbox.props?.disabled,
          colorScheme: checkbox.props?.colorScheme || this.colorScheme,
          rounding: checkbox.props?.rounding || this.rounding,
          size: checkbox.props?.size || this.size,
          transition: checkbox.props?.transition || this.transition,
          enableHtml:
            typeof checkbox.props?.enableHtml === "undefined"
              ? this.enableHtml
              : checkbox.props?.enableHtml,
        });
        checkbox.key = checkbox.key || checkbox.props?.id;
        return checkbox;
      };

      if (this.items?.length) {
        return this.items.map(prepareProps);
      }

      return this.$slots.default?.().map(prepareProps) || [];
    },

    // TODO: control-notification component: error (danger?) | warning  | notice(info?)| success
    renderError(): VNode | null {
      if (this.error || this.$slots.error) {
        const fontClassName = prepareCssClassName(
          codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
          this.errorFont || this.size
        );
        const classes = [
          styles[config.errorClassName],
          fontStyles[fontClassName],
          this.errorClass,
        ];

        if (this.enableHtml) {
          return <div class={classes} v-html={this.error} />;
        }

        return <div class={classes}>{this.$slots.error?.() || this.error}</div>;
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
        {this.renderItemList}
        {this.renderError}
      </Tag>
    );
  },
});
