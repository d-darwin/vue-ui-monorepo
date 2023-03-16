import {
  defineComponent,
  ref,
  Transition as Trans,
  type VNode,
  type PropType,
  type InputHTMLAttributes,
} from "vue";
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import colorSchemeStyles from "@darwin-studio/ui-codegen/dist/styles/color-scheme.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import useControlId from "@darwin-studio/vue-ui/src/compositions/control-id";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import getCommonCssClass from "@darwin-studio/vue-ui/src/utils/get-common-css-class";
import { TOKEN_NAME } from "@darwin-studio/vue-ui/src/constants/token-name";
import { BASE_COLOR_SCHEME, DEFAULT_VALUE } from "./constants";
import config from "./config";
import styles from "./index.css?module";

/**
 * Renders <b>input</b> element with <i>type="checkbox"</i>, label, error and customizable ✓ icon.
 */
// TODO: indeterminate (or mixed) state
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Defines is the component is checked by default
     */
    checked: Boolean,
    /**
     * Defines value of the <b>input</b> element
     */
    value: generateProp.text(DEFAULT_VALUE),
    /**
     * Defines appearance of the component
     */
    colorScheme: generateProp.colorScheme(BASE_COLOR_SCHEME),
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
     * Defines <i>id</i> attr of the <b>input</b> element.<br>
     * If you don't want to specify it, it will be generated automatically.
     */
    id: generateProp.text(),
    /**
     * You can pass own class name to the <b>input</b> element.
     */
    inputClass: String,
    /**
     * You can pass any attributes to the <b>input</b> element.
     */
    inputAttrs: generateProp.options<InputHTMLAttributes>(),
    /**
     * Defines content of the <b>label</b> element.
     */
    label: generateProp.text(),
    /**
     * You can pass own class name to the <b>label</b> element.
     */
    // TODO: move to labeOptions:
    labelClass: String,
    /**
     * Defines font size of the <b>label</b> element. By default depends on props.size
     */
    // TODO: move to labeOptions:
    labelFont: generateProp.font(),
    /**
     * If not empty renders as an error string below the <b>input</b> element.
     */
    // TODO: use DCaption
    error: generateProp.content(),
    /**
     * You can pass own class name to the <b>error</b> element.
     */
    // TODO: move to errorOptions:
    errorClass: String,
    /**
     * Defines font size of the <b>error</b> element. By default depends on props.size
     */
    // TODO: move to errorOptions:
    errorFont: generateProp.font(),
    /**
     * You can pass own class name to the icon container element.
     */
    // TODO: option ???
    iconContainerClass: String,
    /**
     * Pass true to disable <b>input</b> element.
     */
    disabled: Boolean,
    /**
     * Defines container element type of the component
     */
    tag: generateProp.tag(),
    /**
     * Enables html string rendering passed in props.label and props.error.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    enableHtml: Boolean,

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
    const { controlId } = useControlId(props);

    return { innerChecked, controlId };
  },

  emits: [
    EVENT_NAME.CHANGE,
    EVENT_NAME.INPUT,
    EVENT_NAME.UPDATE_CHECKED,
    EVENT_NAME.UPDATE_VALUE,
  ],

  computed: {
    renderIcon(): VNode[] {
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
        getCommonCssClass(
          TOKEN_NAME.BORDER,
          `${BASE_COLOR_SCHEME}-${this.size}`
        ),
        getCommonCssClass(TOKEN_NAME.COLOR_SCHEME, this.colorScheme),
        getCommonCssClass(TOKEN_NAME.PADDING, PADDING.EQUAL),
        getCommonCssClass(TOKEN_NAME.PADDING, `${PADDING.EQUAL}-${this.size}`),
        getCommonCssClass(TOKEN_NAME.ROUNDING, this.rounding),
        getCommonCssClass(TOKEN_NAME.SIZE, this.size),
        getCommonCssClass(TOKEN_NAME.TRANSITION, this.transition),
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
            getCommonCssClass(TOKEN_NAME.SIZE, this.size),
          ]}
        />,
        <div class={iconContainerClasses}>
          <Trans
            enterActiveClass={styles.transitionEnterActive}
            leaveActiveClass={styles.transitionLeaveActive}
          >
            {!this.$slots?.icon && this.innerChecked && (
              <div
                class={[
                  styles[config.iconClassName],
                  getCommonCssClass(TOKEN_NAME.TRANSITION, this.transition),
                ]}
              >
                {config.checkMark}
              </div>
            )}

            {this.$slots?.icon && this.innerChecked && this.$slots.icon?.()}
          </Trans>
        </div>,
      ];
    },

    renderInput(): VNode {
      return (
        <input
          type={config.inputType}
          id={this.label || this.id ? this.controlId : undefined}
          checked={this.checked}
          value={this.value}
          disabled={this.disabled}
          {...this.inputAttrs}
          class={[
            styles[config.inputClassName],
            getCommonCssClass(
              TOKEN_NAME.OUTLINE,
              `${BASE_COLOR_SCHEME}-${this.size}`
            ),
            getCommonCssClass(TOKEN_NAME.SIZE, this.size),
            this.inputClass,
          ]}
          onChange={this.changeHandler}
          onInput={this.inputHandler}
        />
      );
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

    renderLabel(): VNode {
      const labelClasses = [
        styles[config.labelClassName],
        getCommonCssClass(TOKEN_NAME.FONT, this.labelFont || this.size),
        this.labelClass,
      ];
      if (this.disabled) {
        labelClasses.push(styles.__disabled);
      }

      return (
        <label for={this.controlId} class={labelClasses}>
          {this.renderInput}
          {this.renderIcon}
          {this.renderLabelContent}
        </label>
      );
    },

    // TODO: control-notification component: error (danger?) | warning  | notice(info?)| success
    renderError(): VNode | null {
      if (this.error || this.$slots.error) {
        const classes = [
          styles[config.errorClassName],
          getCommonCssClass(TOKEN_NAME.FONT, this.errorFont || this.size),
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

      this.innerChecked = checked; // TODO: try to avoid using inner state
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
      /**
       * Emits on click with value payload
       * @event update:value
       * @type {value: Text | undefined}
       */
      this.$emit(EVENT_NAME.UPDATE_VALUE, checked ? value : undefined);
      this.whenInput?.(checked ? value : undefined);
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
    return (
      <Tag
        class={[
          styles[config.className],
          getCommonCssClass(TOKEN_NAME.MIN_CONTROL_WIDTH, this.size),
        ]}
      >
        {this.renderLabel}
        {/*TODO: add transition | use DCaption?*/}
        {this.renderError}
      </Tag>
    );
  },
});
