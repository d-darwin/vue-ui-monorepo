import { defineComponent, type PropType, type VNode } from "vue";
import { v4 as uuid } from "uuid";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import getCommonCssClass from "@darwin-studio/vue-ui/src/utils/get-common-css-class";
import { TOKEN_NAME } from "@darwin-studio/vue-ui/src/constants/token-name";
import config from "./config";
import styles from "./index.css?module";

/**
 * Renders group of the DRadio components with label and error
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * The common name for the radio group
     */
    name: generateProp.text(() => uuid()), // TODO: use instead of useControlId ???
    /**
     * Array of the DRadio components, alternatively you can use default slot
     */
    items: {
      type: Array as PropType<VNode[]>, // TODO: more accurate type, what about array of DRadio props?
    },
    /**
     * Defines value of the <b>input</b> element to preselect
     */
    /*TODO: do we need it ?
    value: {
      type: [String, Number] as PropType<Text>,
      required: true,
    },*/
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
    errorClass: String,
    /**
     * Defines font size of the <b>error</b> element. By default depends on props.size
     */
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

  data() {
    return {
      innerValue: null as Text | null, // TODO: avoid using inner states
    };
  },

  computed: {
    // TODO: reuse -> composition
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
      const prepareProps = (radio: VNode) => {
        Object.assign(radio.props || {}, {
          checked: this.innerValue === radio.props?.value,
          name: radio.props?.name || this.name,
          class: [styles[config.radioClassName], radio.props?.class],
          disabled:
            typeof radio.props?.disabled === "undefined"
              ? this.disabled
              : radio.props?.disabled,
          colorScheme: radio.props?.colorScheme || this.colorScheme,
          rounding: radio.props?.rounding || this.rounding,
          size: radio.props?.size || this.size,
          transition: radio.props?.transition || this.transition,
          whenChange: (value: Text) => {
            // TODO: find out a better way to watch on checked item
            if (this.innerValue !== value) {
              this.changeHandler(value);
              radio.props?.whenChange?.(value); // TODO: are they already merged ???
            }
          },
        });
        radio.key = radio.key || radio.props?.id;
        return radio;
      };

      if (this.items?.length) {
        return this.items.map(prepareProps);
      }

      return this.$slots.default?.().map(prepareProps) || [];
    },

    // TODO: control-notification component: error (danger?) | warning  | notice(info?)| success
    renderError(): VNode | null {
      if (this.$slots.error || this.error) {
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

  methods: {
    changeHandler(value: Text): void {
      // TODO: emits/whens
      this.innerValue = value;
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
