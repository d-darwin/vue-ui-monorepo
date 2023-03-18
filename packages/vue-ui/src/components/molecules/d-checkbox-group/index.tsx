import { defineComponent, type PropType, type VNode } from "vue";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import { TOKEN_NAME } from "@darwin-studio/vue-ui/src/constants/token-name";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import getCommonCssClass from "@darwin-studio/vue-ui/src/utils/get-common-css-class";
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
     * Plain string or VNode
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

    // TODO: whenChange\WhenInput
  },

  computed: {
    renderLabel(): VNode | null {
      if (this.$slots.label?.() || this.label) {
        return (
          /*TODO: customizable tag*/
          <legend
            class={[
              styles[config.labelClassName],
              getCommonCssClass(TOKEN_NAME.FONT, this.labelFont || this.size),
              this.labelClass,
            ]}
          >
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
        return (
          <div
            class={[
              styles[config.errorClassName],
              getCommonCssClass(TOKEN_NAME.FONT, this.errorFont || this.size),
              this.errorClass,
            ]}
          >
            {this.$slots.error?.() || this.error}
          </div>
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
        {this.renderItemList}
        {this.renderError}
      </Tag>
    );
  },
});
