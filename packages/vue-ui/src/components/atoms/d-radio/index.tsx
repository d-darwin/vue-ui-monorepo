import {
  defineComponent,
  InputHTMLAttributes,
  PropType,
  ref,
  VNode,
  Transition as Trans,
  Ref,
  watch,
  mergeProps,
} from "vue";
import type { ColorScheme } from "@darwin-studio/ui-codegen/dist/types/color-scheme"; // TODO: shorter path, default export ???
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme"; // TODO: shorter path, default export ???
import type { Font } from "@darwin-studio/ui-codegen/dist/types/font"; // TODO: shorter path, default export ???
import type { Padding } from "@darwin-studio/ui-codegen/dist/types/padding"; // TODO: shorter path, default export ???
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding"; // TODO: shorter path, default export ???
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
import paddingStyles from "@darwin-studio/ui-codegen/dist/styles/padding.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import roundingStyles from "@darwin-studio/ui-codegen/dist/styles/rounding.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import sizeStyles from "@darwin-studio/ui-codegen/dist/styles/size.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import transitionStyles from "@darwin-studio/ui-codegen/dist/styles/transition.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import minControlWidthStyles from "@darwin-studio/ui-codegen/dist/styles/min-control-width.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import useControlId from "@darwin-studio/vue-ui/src/compositions/control-id";
import type { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import type { DButtonProps } from "@darwin-studio/vue-ui/src/components/atoms/d-button/types";
import { DButtonAsync as DButton } from "@darwin-studio/vue-ui/src/components/atoms/d-button/async";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import type { Type } from "./types";
import { TYPE, BASE_COLOR_SCHEME, BUTTON_DEFAULTS } from "./constants";
import styles from "./index.css?module";
import config from "./config";

export default defineComponent({
  name: config.name,

  props: {
    /**
     * Defines is the component is checked by default
     */
    checked: {
      type: Boolean,
    },
    /**
     * Defines value of the <b>input</b> element
     */
    value: {
      type: [String, Number] as PropType<Text>,
      required: true,
    },
    /**
     * The common name for the radio group
     */
    name: {
      type: [String, Number] as PropType<Text>,
    },
    /**
     * Defines <i>id</i> attr of the <b>input</b> element.<br>
     * If you don't want to specify it, it will be generated automatically.
     */
    id: {
      type: [String, Number] as PropType<Text>,
    },
    /**
     * Defines appearance of the components.
     */
    type: {
      type: String as PropType<Type>,
      default: TYPE.BASE,
    },
    /**
     * You can pass own class name to the <b>input</b> element.
     */
    inputClass: {
      type: String,
    },
    /**
     * You can pass any attributes to the <b>input</b> element.
     */
    inputAttrs: {
      type: Object as PropType<InputHTMLAttributes>,
    },
    /**
     * Defines appearance of the component
     */
    colorScheme: {
      type: String as PropType<ColorScheme>,
      default: COLOR_SCHEME.SECONDARY, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines padding type of the component, use 'equal' if the component contains only an icon
     */
    padding: {
      type: String as PropType<Padding>,
      default: PADDING.EQUAL, // TODO: gent defaults base on actual values, not hardcoded
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
     * You can pass own class name to the icon container element.
     */
    iconContainerClass: {
      type: String,
    },
    /**
     * Pass true to disable <b>input</b> element.
     */
    // TODO: disabled and unchecked should have different appearance
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
     * Pass any DButton.props to customize button, f.e. { colorScheme: "danger" }
     */
    buttonOptions: {
      type: Object as PropType<DButtonProps>,
      default: () => BUTTON_DEFAULTS,
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
        (checked?: boolean, value?: Text) => void | Promise<void>
      >,
    },
    /**
     * Alternative way to catch input event
     */
    whenInput: {
      type: Function as PropType<(value?: Text) => void | Promise<void>>,
    },
  },

  setup(props) {
    const innerChecked = ref(props.checked); // TODO: what for ???
    // To manipulate get getBoundingClientRect and adjust tooltip position
    // It's a bit of magic - use the same refs name in the render function and return they from the setup()
    // https://markus.oberlehner.net/blog/refs-and-the-vue-3-composition-api/
    const inputRef: Ref<HTMLInputElement | null> = ref(null);
    const { controlId } = useControlId(props);

    watch(
      () => props.checked,
      (checked) => {
        innerChecked.value = checked;
      }
    );

    return { innerChecked, inputRef, controlId };
  },

  emits: [
    EVENT_NAME.CHANGE,
    EVENT_NAME.INPUT,
    EVENT_NAME.UPDATE_CHECKED,
    EVENT_NAME.UPDATE_VALUE,
  ],

  computed: {
    renderInput(): VNode {
      // TODO: outline and size and colorScheme separately ???
      const outlineClassName = prepareCssClassName(
        codegenConfig.TOKENS.OUTLINE.CSS_CLASS_PREFIX,
        `${BASE_COLOR_SCHEME}-${this.size}`
      );
      const sizeClassName = prepareCssClassName(
        codegenConfig.TOKENS.SIZE.CSS_CLASS_PREFIX,
        this.size
      );

      return (
        <input
          ref={config.inputRef}
          type="radio"
          id={this.label || this.id ? this.controlId : undefined}
          name={String(this.name)}
          checked={this.innerChecked}
          value={this.value}
          disabled={this.disabled}
          tabindex={this.type === TYPE.BASE ? 1 : -1}
          {...this.inputAttrs}
          class={[
            styles[config.inputClassName],
            outlineStyles[outlineClassName],
            sizeStyles[sizeClassName],
            this.inputClass,
          ]}
          onChange={this.changeHandler}
          onInput={this.inputHandler}
        />
      );
    },

    renderIcon(): VNode[] {
      // TODO: border and size and colorScheme separately ???
      const borderClassName = prepareCssClassName(
        codegenConfig.TOKENS.BORDER.CSS_CLASS_PREFIX,
        `${BASE_COLOR_SCHEME}-${this.size}`
      );
      const colorSchemeClassName = prepareCssClassName(
        codegenConfig.TOKENS.COLOR_SCHEME.CSS_CLASS_PREFIX,
        this.colorScheme
      );
      const paddingClassName = prepareCssClassName(
        codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
        this.type === TYPE.BASE ? PADDING.EQUAL : this.padding
      );
      const paddingSizeClassName = prepareCssClassName(
        codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
        `${this.type === TYPE.BASE ? PADDING.EQUAL : this.padding}-${this.size}`
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

      const iconContainerClasses = [
        styles[config.iconContainerClassName],
        borderStyles[borderClassName],
        colorSchemeStyles[colorSchemeClassName],
        paddingStyles[paddingClassName],
        paddingStyles[paddingSizeClassName],
        roundingStyles[roundingClassName],
        sizeStyles[sizeClassName],
        transitionStyles[transitionClassName],
      ];
      if (this.disabled) {
        iconContainerClasses.push(colorSchemeStyles.__disabled);
      }
      if (this.iconContainerClass) {
        iconContainerClasses.push(this.iconContainerClass);
      }

      // TODO: try not to use backdrop at all
      return [
        <div
          class={[
            styles[config.iconContainerBackdropClassName],
            sizeStyles[sizeClassName],
          ]}
        />,
        <div class={iconContainerClasses}>
          <Trans
            enterActiveClass={styles.transitionEnterActive}
            leaveActiveClass={styles.transitionLeaveActive}
          >
            {!this.$slots?.icon && this.innerChecked && (
              <div
                class={{
                  [styles[config.iconClassName]]: true,
                  [transitionStyles[transitionClassName]]: true,
                }}
              >
                {config.checkMark}
              </div>
            )}

            {this.$slots?.icon && this.innerChecked && this.$slots.icon?.()}
          </Trans>
        </div>,
      ];
    },

    renderLabelContent(): VNode | null {
      if (this.$slots.label?.() || this.label) {
        if (this.enableHtml) {
          return (
            <div
              class={styles[config.labelInnerClassName]}
              v-html={this.label}
            />
          );
        }

        return (
          <div class={styles[config.labelInnerClassName]}>
            {this.$slots.label?.() || this.label}
          </div>
        );
      }

      return null;
    },

    renderButton(): VNode {
      return (
        <DButton
          label={this.label}
          active={this.innerChecked} // TODO: checked and disabled state should have different appearance
          disabled={this.disabled} // TODO: checked and disabled state should have different appearance
          colorScheme={this.colorScheme}
          padding={this.padding}
          rounding={this.rounding}
          size={this.size}
          transition={this.transition}
          whenClick={this.buttonClickHandler}
          {...mergeProps(BUTTON_DEFAULTS, this.buttonOptions || {})}
        />
      );
    },

    renderLabel(): VNode {
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.labelFont || this.size
      );

      const labelClasses = [
        styles[config.labelClassName],
        fontStyles[fontClassName],
        this.labelClass,
      ];
      if (this.disabled) {
        labelClasses.push(styles.__disabled);
      }

      return (
        <label for={this.controlId} class={labelClasses}>
          {this.renderInput}
          {this.type === TYPE.BASE
            ? [this.renderIcon, this.renderLabelContent]
            : this.renderButton}
        </label>
      );
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
    changeHandler(event: Event): void {
      const checked = (event.target as HTMLInputElement).checked;
      const value = (event.target as HTMLInputElement).value;

      /**
       * Emits on click with checked and value payload
       * @event change
       * @type {checked: Boolean, value: Text | undefined}
       */
      this.$emit(EVENT_NAME.CHANGE, checked, checked ? value : undefined);
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
      this.$emit(EVENT_NAME.UPDATE_VALUE, checked ? value : undefined);
      this.whenChange?.(checked, checked ? value : undefined);

      this.innerChecked = checked;
    },

    inputHandler(event: Event): void {
      const checked = (event.target as HTMLInputElement).checked;
      const value = (event.target as HTMLInputElement).value;

      /**
       * Emits on input with checked payload
       * @event input
       * @type {value: Text | undefined}
       */
      this.$emit(EVENT_NAME.INPUT, checked ? value : undefined);
      this.whenInput?.(checked ? value : undefined);

      this.innerChecked = checked;
    },

    buttonClickHandler(): void {
      const inputEl = this.inputRef;
      if (inputEl) {
        inputEl.click();
      }
    },
  },

  /*TODO: why vue-docgen cant' detect not default slots ???*/
  /**
   * @slot $slots.icon
   * Use your own checked mark
   * */
  /**
   * @slot $slots.label
   * Use instead of props.label to fully customize label content
   * */
  /**
   * @slot $slots.error
   * Use instead of props.error to fully customize error content
   * */
  // TODO: input slot ???
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
        {/*TODO: add transition | what about layout shift ???*/}
        {this.renderError}
      </Tag>
    );
  },
});
