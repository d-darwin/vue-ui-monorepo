import {
  CSSProperties,
  defineComponent,
  InputHTMLAttributes,
  PropType,
  VNode,
} from "vue";
import type { Font } from "@darwin-studio/vue-ui-codegen/dist/types/font"; // TODO: shorter path, default export ???
import type { Padding } from "@darwin-studio/vue-ui-codegen/dist/types/padding"; // TODO: shorter path, default export ???
import { PADDING } from "@darwin-studio/vue-ui-codegen/dist/constants/padding"; // TODO: shorter path, default export ???
import type { Rounding } from "@darwin-studio/vue-ui-codegen/dist/types/rounding"; // TODO: shorter path, default export ???
import { ROUNDING } from "@darwin-studio/vue-ui-codegen/dist/constants/rounding"; // TODO: shorter path, default export ???
import type { Size } from "@darwin-studio/vue-ui-codegen/dist/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import type { Transition } from "@darwin-studio/vue-ui-codegen/dist/types/transition"; // TODO: shorter path, default export ???
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition"; // TODO: shorter path, default export ???
import borderStyles from "@darwin-studio/vue-ui-codegen/dist/styles/border.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import fontStyles from "@darwin-studio/vue-ui-codegen/dist/styles/font.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import minControlWidthStyles from "@darwin-studio/vue-ui-codegen/dist/styles/min-control-width.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import outlineStyles from "@darwin-studio/vue-ui-codegen/dist/styles/outline.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import paddingStyles from "@darwin-studio/vue-ui-codegen/dist/styles/padding.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import roundingStyles from "@darwin-studio/vue-ui-codegen/dist/styles/rounding.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import sizeStyles from "@darwin-studio/vue-ui-codegen/dist/styles/size.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import transitionStyles from "@darwin-studio/vue-ui-codegen/dist/styles/transition.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/vue-ui-codegen/config.json";
import useControlId from "@darwin-studio/vue-ui/src/compositions/control-id";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name"; // TODO: fix relative path
import type { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import type { InputTypes } from "./types";
import { INPUT_TYPE, BASE_COLOR_SCHEME } from "./constants";
import styles from "./index.module.css";
import config from "./config";

// TODO: mask ???
// TODO: inverse (dark) color scheme ???
/**
 * Renders <b>input</b> element with label, error and icons slots.
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Defines initial <i>value</i> attr of the <b>input</b> element
     */
    value: {
      type: [String, Number] as PropType<Text>,
    },
    /**
     * Defines initial <i>placeholder</i> attr of the <b>input</b> element
     */
    placeholder: {
      type: String,
    },
    /**
     * Defines <i>id</i> attr of the <b>input</b> element
     */
    id: {
      type: [String, Number] as PropType<Text>,
    },
    /**
     * Defines padding type of the <b>input</b> element
     */
    padding: {
      type: String as PropType<Padding>,
      default: PADDING.DEFAULT, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines corner rounding of the <b>input</b> element
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
     * Defines <i>type</i> attr of the <b>input</b> element
     */
    inputType: {
      type: String as PropType<InputTypes>,
      default: INPUT_TYPE.TEXT,
    },
    // TODO: doesnt work properly (((
    /**
     * Defines <i>size</i> attr of the <b>input</b> element.<br>
     */
    inputSize: {
      type: Number,
      default: 1,
    },
    /**
     * You can pass own class name to the <b>input</b> element.
     */
    inputClass: {
      type: String,
    },
    /**
     * Defines font size of the <b>input</b> element. By default depends on props.size
     */
    inputFont: {
      type: String as PropType<Font>,
    },
    /**
     * You can pass any attributes to the <b>input</b> element.
     */
    inputAttrs: {
      type: Object as PropType<InputHTMLAttributes>,
    },
    /**
     * Defines content of the <b>label</b> element.
     */
    label: {
      type: [String, Number] as PropType<Text>,
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
     * If not empty renders as an error string below the <b>input</b> tag.
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
     * Defines container element type of the component
     */
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.DIV,
    },
    /**
     * Enables html string rendering passed in props.label and props.error.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    enableHtml: {
      type: Boolean,
    },

    /**
     * Alternative way to catch change event
     */
    whenChange: {
      type: Function as PropType<(value: string) => void | Promise<void>>,
    },
    /**
     * Alternative way to catch input event
     */
    whenInput: {
      type: Function as PropType<(value: string) => void | Promise<void>>,
    },
    /**
     * Alternative way to catch submit event
     */
    whenSubmit: {
      type: Function as PropType<(value: string) => void | Promise<void>>,
    },
  },

  setup(props) {
    return useControlId(props);
  },

  emits: [
    EVENT_NAME.CHANGE,
    EVENT_NAME.INPUT,
    EVENT_NAME.SUBMIT,
    EVENT_NAME.UPDATE_VALUE,
  ],

  computed: {
    renderLabel(): VNode | null {
      if (this.label || this.$slots.label) {
        const fontClassName = prepareCssClassName(
          codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
          this.labelFont || this.size
        );
        const bindings = {
          for: this.controlId,
          class: [
            styles[config.labelClassName],
            fontStyles[fontClassName],
            this.labelClass,
          ],
        };

        if (this.enableHtml) {
          return <label {...bindings} v-html={this.label} />;
        }

        return (
          <label {...bindings}>{this.$slots.label?.() || this.label}</label>
        );
      }

      return null;
    },

    inputClasses(): (string | undefined)[] {
      // TODO: border and size and colorScheme separately ???
      const borderClassName = prepareCssClassName(
        codegenConfig.TOKENS.BORDER.CSS_CLASS_PREFIX,
        `${BASE_COLOR_SCHEME}-${this.size}`
      );
      // TODO: font and size separately
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.inputFont || this.size
      );
      // TODO: outline and size and colorScheme separately ???
      const outlineClassName = prepareCssClassName(
        codegenConfig.TOKENS.OUTLINE.CSS_CLASS_PREFIX,
        `${BASE_COLOR_SCHEME}-${this.size}`
      );
      const paddingClassName = prepareCssClassName(
        codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
        this.padding
      );
      const paddingSizeClassName = prepareCssClassName(
        codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
        `${this.padding}-${this.size}`
      );
      const roundingClassName = prepareCssClassName(
        codegenConfig.TOKENS.ROUNDING.CSS_CLASS_PREFIX,
        this.rounding
      );
      const sizeClassName = prepareCssClassName(
        codegenConfig.TOKENS.SIZE.CSS_CLASS_PREFIX,
        this.size
      );
      const transitionClassName = prepareCssClassName(
        codegenConfig.TOKENS.TRANSITION.CSS_CLASS_PREFIX,
        this.transition
      );

      return [
        styles[config.inputClassName],
        borderStyles[borderClassName],
        fontStyles[fontClassName],
        outlineStyles[outlineClassName],
        paddingStyles[paddingSizeClassName],
        paddingStyles[paddingClassName],
        roundingStyles[roundingClassName],
        sizeStyles[sizeClassName],
        transitionStyles[transitionClassName],
        this.inputClass,
      ];
    },

    // TODO: how to do it in a more elegant way
    // TODO: test cases
    inputStyles(): CSSProperties {
      const styles: CSSProperties = {};

      if (this.$slots.before) {
        styles[
          "padding-left"
        ] = `var(--${codegenConfig.TOKENS.SIZE.NAME}-${this.size})`;
      }

      if (this.$slots.after) {
        styles[
          "padding-right"
        ] = `var(--${codegenConfig.TOKENS.SIZE.NAME}-${this.size})`;
      }

      return styles;
    },

    hasSlot(): boolean {
      return Boolean(this.$slots.before || this.$slots.after);
    },

    renderInput(): VNode {
      const inputVNode = (
        <input
          id={this.label || this.id ? this.controlId : undefined}
          value={this.value}
          placeholder={this.placeholder}
          disabled={this.disabled}
          type={this.inputType}
          size={this.inputSize} // TODO: why warning ???
          {...this.inputAttrs}
          class={this.inputClasses}
          style={this.inputStyles} // TODO: why warning ???
          onChange={this.changeHandler} // TODO: why warning ???
          onInput={this.inputHandler} // TODO: why warning ???
          onKeyup={this.keyupHandler}
        />
      );

      if (this.hasSlot) {
        const sizeClassName = prepareCssClassName(
          codegenConfig.TOKENS.SIZE.CSS_CLASS_PREFIX,
          this.size
        );

        return (
          <div class={styles[config.inputContainerClassName]}>
            {this.$slots.before && (
              <div
                class={[
                  styles[config.beforeContainerClass],
                  sizeStyles[sizeClassName],
                ]}
              >
                {this.$slots.before?.()}
              </div>
            )}
            {inputVNode}
            {this.$slots.after && (
              <div
                class={[
                  styles[config.afterContainerClass],
                  sizeStyles[sizeClassName],
                ]}
              >
                {this.$slots.after?.()}
              </div>
            )}
          </div>
        );
      }

      return inputVNode;
    },

    // TODO: control-notification: error (danger?) | warning  | notice(info?)| success
    // TODO: how to avoid layout shift
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
    changeHandler(event: Event) {
      const value = (event.target as HTMLInputElement).value;
      /**
       * Emits on change with value payload
       * @event change
       * @type {value: Text}
       */
      this.$emit(EVENT_NAME.CHANGE, value);
      /**
       * Emits on change with value payload
       * @event update:value
       * @type {value: Text}
       */
      this.$emit(EVENT_NAME.UPDATE_VALUE, value);
      this.whenChange?.(value);
    },

    inputHandler(event: Event) {
      const value = (event.target as HTMLInputElement).value;
      /**
       * Emits on input with value payload
       * @event input
       * @type {value: Text}
       */
      this.$emit(EVENT_NAME.INPUT, value);
      this.whenInput?.(value);
    },

    keyupHandler(event: KeyboardEvent) {
      if (event.key === "Enter") {
        const value = (event.target as HTMLInputElement).value;
        /**
         * Emits on Enter keyup with value payload
         * @event submit
         * @type {value: Text}
         */
        this.$emit(EVENT_NAME.SUBMIT, value);
        this.whenSubmit?.(value);
      }
    },
  },

  render(): VNode {
    const Tag = this.tag;

    const minControlWidthClassName = prepareCssClassName(
      codegenConfig.TOKENS.MIN_CONTROL_WIDTH.CSS_CLASS_PREFIX,
      `${this.size}-${codegenConfig.TOKENS.MIN_CONTROL_WIDTH.CSS_CLASS_SUFFIX}`
    );

    return (
      <Tag
        class={[
          styles[config.className],
          minControlWidthStyles[minControlWidthClassName],
        ]}
      >
        {this.renderLabel}
        {this.renderInput}
        {/*TODO: transition*/}
        {this.renderError}
      </Tag>
    );
  },
});
