import { defineComponent, PropType, VNode } from "vue";
import type { Font } from "@darwin-studio/ui-codegen/dist/types/font"; // TODO: shorter path, default export ???
import type { ColorScheme } from "@darwin-studio/ui-codegen/dist/types/color-scheme"; // TODO: shorter path, default export ???
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import type { Rounding } from "@darwin-studio/ui-codegen/dist/types/rounding"; // TODO: shorter path, default export ???
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding"; // TODO: shorter path, default export ???
import type { Size } from "@darwin-studio/ui-codegen/dist/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import type { Transition } from "@darwin-studio/ui-codegen/dist/types/transition"; // TODO: shorter path, default export ???
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition"; // TODO: shorter path, default export ???
import borderStyles from "@darwin-studio/ui-codegen/dist/styles/border.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import colorSchemeStyles from "@darwin-studio/ui-codegen/dist/styles/color-scheme.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import fontStyles from "@darwin-studio/ui-codegen/dist/styles/font.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import outlineStyles from "@darwin-studio/ui-codegen/dist/styles/outline.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import roundingStyles from "@darwin-studio/ui-codegen/dist/styles/rounding.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import sizeStyles from "@darwin-studio/ui-codegen/dist/styles/size.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import transitionStyles from "@darwin-studio/ui-codegen/dist/styles/transition.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import useControlId from "@darwin-studio/vue-ui/src/compositions/control-id";
import type { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import DAspectRatio from "@darwin-studio/vue-ui/src/components/containers/d-aspect-ratio";
import type { Values, Value } from "./types";
import config from "./config";
import styles from "./index.css?module";

/**
 * The components renders switch (has true / false value) or toggle (has custom values).
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Defines <i>id</i> attr of the <b>input</b> element
     */
    id: {
      type: [String, Number] as PropType<Text>,
    },
    /**
     * Defines if the component at the truthy state by default
     */
    checked: {
      type: Boolean,
    },
    /**
     * Replace default true/false values with your own.
     */
    values: {
      // TODO: naming, combine with labels ???
      type: Object as PropType<Values>,
    },
    /**
     * Add labels to the component states.
     */
    labels: {
      // TODO: naming, combine with values ???
      type: Object as PropType<Values>,
    },
    /**
     * You can pass own class name to the <b>input</b> element.
     */
    inputClass: {
      type: String,
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
     * Defines common font size of the component
     */
    font: {
      type: String as PropType<Font>,
    },
    /**
     * Defines appearance of the component
     */
    colorScheme: {
      type: String as PropType<ColorScheme>,
      default: COLOR_SCHEME.PRIMARY, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines corner rounding of the icon container element
     */
    rounding: {
      type: String as PropType<Rounding>,
      default: ROUNDING.FULL, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines size of the component
     */
    size: {
      // TODO: fontSize and size separately ???
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
     * Pass true to disable <b>input</b> element.
     */
    disabled: {
      type: Boolean,
    },
    // TODO: readonly state ???
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
      type: Function as PropType<
        (checked?: boolean, value?: Value) => void | Promise<void>
      >,
    },
    /**
     * Alternative way to catch input event
     */
    whenInput: {
      type: Function as PropType<(value?: Value) => void | Promise<void>>,
    },
  },

  setup(props) {
    return useControlId(props);
  },

  emits: [
    EVENT_NAME.CHANGE,
    EVENT_NAME.INPUT,
    EVENT_NAME.UPDATE_CHECKED,
    EVENT_NAME.UPDATE_VALUE,
  ],

  computed: {
    labelClasses(): (string | undefined)[] {
      // TODO: add getters?
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.labelFont || this.font || this.size
      );

      return [
        styles[config.labelClassName],
        fontStyles[fontClassName],
        this.labelClass,
        this.disabled ? styles.__disabled : undefined,
      ];
    },
    // TODO: add label generator ???
    renderFalsyLabel(): VNode | null {
      if (this.labels?.falsy || this.$slots.labelFalsy) {
        if (this.enableHtml) {
          return (
            <label
              for={this.controlId}
              class={this.labelClasses}
              v-html={this.labels?.falsy}
            />
          );
        }

        return (
          <label for={this.controlId} class={this.labelClasses}>
            {this.$slots.labelFalsy?.() || this.labels?.falsy}
          </label>
        );
      }

      return null;
    },

    renderThumb(): VNode | VNode[] {
      // TODO: add getters?
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.font || this.size
      );
      // TODO: add getters?
      const roundingClassName = prepareCssClassName(
        codegenConfig.TOKENS.ROUNDING.CSS_CLASS_PREFIX,
        this.rounding
      );
      // TODO: add getters?
      const sizeClassName = prepareCssClassName(
        codegenConfig.TOKENS.SIZE.CSS_CLASS_PREFIX,
        this.size
      );
      // TODO: add getters?
      const transitionClassName = prepareCssClassName(
        codegenConfig.TOKENS.TRANSITION.CSS_CLASS_PREFIX,
        this.transition
      );

      return (
        <div
          class={[
            styles[config.thumbClassName],
            fontStyles[fontClassName],
            roundingStyles[roundingClassName],
            sizeStyles[sizeClassName],
            transitionStyles[transitionClassName],
          ]}
        >
          {this.$slots.thumb?.() || (
            <div
              class={[
                styles[config.thumbInnerClassName],
                roundingStyles[roundingClassName],
                transitionStyles[transitionClassName],
              ]}
            />
          )}
        </div>
      );
    },

    renderInput(): VNode {
      // TODO: border and size and colorScheme separately ???
      // TODO: add getters?
      const borderClassName = prepareCssClassName(
        codegenConfig.TOKENS.BORDER.CSS_CLASS_PREFIX,
        `${this.colorScheme}-${this.size}`
      );
      // TODO: add getters?
      const colorSchemeClassName = prepareCssClassName(
        codegenConfig.TOKENS.COLOR_SCHEME.CSS_CLASS_PREFIX,
        this.colorScheme
      );
      // TODO: outline and size and colorScheme separately ???
      // TODO: add getters?
      const outlineClassName = prepareCssClassName(
        codegenConfig.TOKENS.OUTLINE.CSS_CLASS_PREFIX,
        `${this.colorScheme}-${this.size}`
      );
      // TODO: add getters?
      const roundingClassName = prepareCssClassName(
        codegenConfig.TOKENS.ROUNDING.CSS_CLASS_PREFIX,
        this.rounding
      );
      // TODO: add getters?
      const sizeClassName = prepareCssClassName(
        codegenConfig.TOKENS.SIZE.CSS_CLASS_PREFIX,
        this.size
      );
      // TODO: add getters?
      const transitionClassName = prepareCssClassName(
        codegenConfig.TOKENS.TRANSITION.CSS_CLASS_PREFIX,
        this.transition
      );

      return (
        // TODO: props.aspectRatioOptions
        <DAspectRatio
          aspectRatio={config.trackAspectRatio}
          class={[
            styles[config.trackClassName],
            this.disabled ? styles.__disabled : undefined,
            this.disabled ? colorSchemeStyles.__disabled : undefined,
            borderStyles[borderClassName],
            colorSchemeStyles[colorSchemeClassName],
            outlineStyles[outlineClassName],
            roundingStyles[roundingClassName],
            sizeStyles[sizeClassName],
            transitionStyles[transitionClassName],
          ]}
          tag="label"
          /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
          /* @ts-ignore TODO */
          for={this.controlId}
        >
          <input
            id={this.controlId}
            value={this.values?.truthy} // TODO: is it right ???
            checked={this.checked || undefined}
            aria-checked={this.checked || undefined}
            disabled={this.disabled || undefined}
            aria-disabled={this.disabled || undefined}
            class={[
              styles[config.inputClassName],
              this.inputClass,
              borderStyles[borderClassName],
              outlineStyles[outlineClassName],
              roundingStyles[roundingClassName],
            ]}
            type="checkbox"
            role="switch"
            onChange={this.changeHandler}
            onInput={this.inputHandler}
          />

          {this.renderThumb}
        </DAspectRatio>
      );
    },
    // TODO: add label generator ???
    renderTruthyLabel(): VNode | null {
      if (this.labels?.truthy || this.$slots.labelTruthy) {
        if (this.enableHtml) {
          return (
            <label
              for={this.controlId}
              class={this.labelClasses}
              v-html={this.labels?.truthy}
            />
          );
        }

        return (
          <label for={this.controlId} class={this.labelClasses}>
            {this.$slots.labelTruthy?.() || this.labels?.truthy}
          </label>
        );
      }

      return null;
    },

    // TODO: control-notification: error (danger?) | warning  | notice(info?)| success
    // TODO: how to avoid layout shift
    renderError(): VNode | null {
      if (this.error || this.$slots.error) {
        const fontClassName = prepareCssClassName(
          codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
          this.errorFont || this.font || this.size
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
    changeHandler(event: Event): void {
      const checked = (event.target as HTMLInputElement).checked;
      const value = checked
        ? this.values?.truthy || (event.target as HTMLInputElement).value
        : this.values?.falsy;

      /**
       * Emits on click with checked and value payload
       * @event change
       * @type {checked: Boolean, value: Text | undefined}
       */
      this.$emit(EVENT_NAME.CHANGE, checked, value);
      /**
       * Emits on click with checked payload
       * @event update:checked
       * @type {checked: Boolean}
       */
      this.$emit(EVENT_NAME.UPDATE_CHECKED, checked);
      /**
       * Emits on click with value payload
       * @event update:value
       * @type {value: Text | undefined}
       */
      this.$emit(EVENT_NAME.UPDATE_VALUE, value);
      this.whenChange?.(checked, value);
    },

    inputHandler(event: Event): void {
      const checked = (event.target as HTMLInputElement).checked;
      const value = checked
        ? this.values?.truthy || (event.target as HTMLInputElement).value
        : this.values?.falsy;

      /**
       * Emits on input with checked payload
       * @event input
       * @type {value: Text | undefined}
       */
      this.$emit(EVENT_NAME.INPUT, value);
      /**
       * Emits on click with value payload
       * @event update:value
       * @type {value: Text | undefined}
       */
      this.$emit(EVENT_NAME.UPDATE_VALUE, value);
      this.whenInput?.(value);
    },
  },

  /**
   * @slot $slots.error
   * Use instead of props.error to fully customize error content
   * */
  /**
   * @slot $slots.labelFalsy
   * Use instead of props.labels.falsy to fully customize falsy label content
   * */
  /**
   * @slot $slots.labelTruthy
   * Use instead of props.labels.truthy to fully customize truthy label content
   * */
  /**
   * @slot $slots.thumb
   * Use instead of regular .thumb content
   * */
  // TODO: input slots ???
  render(): VNode {
    const Tag = this.tag;

    return (
      <Tag class={styles[config.className]}>
        {/*TODO: move .wrapper to config ???*/}
        <div class={styles.wrapper}>
          {this.renderFalsyLabel}
          {this.renderInput}
          {this.renderTruthyLabel}
        </div>
        {this.renderError}
      </Tag>
    );
  },
});
