import { defineComponent, PropType, VNode } from "vue";
import { v4 as uuid } from "uuid";
import type { ColorScheme } from "@darwin-studio/ui-codegen/dist/types/color-scheme"; // TODO: shorter path, default export ???
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme"; // TODO: shorter path, default export ???
import type { Font } from "@darwin-studio/ui-codegen/dist/types/font"; // TODO: shorter path, default export ???
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font"; // TODO: shorter path, default export ???
import type { Rounding } from "@darwin-studio/ui-codegen/dist/types/rounding"; // TODO: shorter path, default export ???
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding"; // TODO: shorter path, default export ???
import type { Size } from "@darwin-studio/ui-codegen/dist/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import type { Transition } from "@darwin-studio/ui-codegen/dist/types/transition"; // TODO: shorter path, default export ???
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition"; // TODO: shorter path, default export ???
import fontStyles from "@darwin-studio/ui-codegen/dist/styles/font.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import type { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import config from "./config";
import styles from "./index.css?module";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";

/**
 * Renders group of the DRadio components with label and error
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * The common name for the radio group
     */
    name: {
      type: [String, Number] as PropType<Text>,
      default: () => uuid(),
    },
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
      default: FONT.MEDIUM,
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
     * Pass true to disable <b>input</b> element.
     */
    // TODO: - or add one props.inputAttrs
    disabled: {
      type: Boolean,
    },
    /**
     * Defines appearance of the component
     */
    colorScheme: {
      type: String as PropType<ColorScheme>,
      default: COLOR_SCHEME.SECONDARY, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines corner rounding of the icon container element
     */
    rounding: {
      type: String as PropType<Rounding>,
      default: ROUNDING.MEDIUM, // TODO: gent defaults base on actual values, not hardcoded
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
     * Defines transition type of the component
     */
    transition: {
      type: String as PropType<Transition>,
      default: TRANSITION.FAST, // TODO: gent defaults base on actual values, not hardcoded
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

    // TODO: whenChange\WhenInput
  },

  data() {
    return {
      innerValue: null as Text | null,
    };
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
          enableHtml:
            typeof radio.props?.enableHtml === "undefined"
              ? this.enableHtml
              : radio.props?.enableHtml,
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
