import {
  defineComponent,
  ref,
  watch,
  Transition as Trans,
  type InputHTMLAttributes,
  type PropType,
  type VNode,
  type Ref,
} from "vue";
import { v4 as uuid } from "uuid";
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding"; // TODO: shorter path, default export ???
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import colorSchemeStyles from "@darwin-studio/ui-codegen/dist/styles/color-scheme.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import type { DButtonProps } from "@darwin-studio/vue-ui/src/components/atoms/d-button/types";
import { DButtonAsync as DButton } from "@darwin-studio/vue-ui/src/components/atoms/d-button/async";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
import type { DCaptionProps } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/types";
import useCaption from "@darwin-studio/vue-ui/src/compositions/caption";
import type { Type } from "./types";
import {
  TYPE,
  BASE_COLOR_SCHEME,
  BUTTON_DEFAULTS,
  CAPTION_DEFAULTS,
} from "./constants";
import styles from "./index.css?module";
import config from "./config";

export default defineComponent({
  name: config.name,

  props: {
    /**
     * Defines <i>id</i> attr of the <b>input</b> element.<br>
     * If you don't want to specify it, it will be generated automatically.
     */
    id: generateProp.text(() => uuid()), // TODO: use instead of useControlId ???
    /**
     * Defines is the component is checked by default
     */
    checked: Boolean,
    /**
     * Defines value of the <b>input</b> element
     */
    value: generateProp.text(undefined, true),
    /**
     * The common name for the radio group
     */
    name: generateProp.text(),
    /**
     * Defines appearance of the components.
     */
    type: generateProp.string<Type>(TYPE.BASE),
    /**
     * You can pass own class name to the <b>input</b> element.
     */
    // TODO: inputOptions
    inputClass: String,
    /**
     * You can pass any attributes to the <b>input</b> element.
     */
    // TODO: inputOptions
    inputAttrs: generateProp.options<InputHTMLAttributes>(),
    /**
     * Defines appearance of the component
     */
    colorScheme: generateProp.colorScheme(BASE_COLOR_SCHEME),
    /**
     * Defines padding type of the component, use 'equal' if the component contains only an icon
     */
    padding: generateProp.padding(PADDING.EQUAL),
    /**
     * Defines corner rounding of the icon container element
     */
    rounding: generateProp.rounding(ROUNDING.FULL),
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
     * Defines content of the <b>label</b> element.
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
     * If not empty renders DCaption below the <b>input</b> element.
     */
    caption: generateProp.content(),
    /**
     * Pass any DCaption.props to customize it, f.e. { type: "error" }
     */
    captionOptions: generateProp.options<DCaptionProps>(CAPTION_DEFAULTS),
    /**
     * Defines offset of DCaption
     */
    captionOffset: generateProp.text(config.captionOffset), // TODO: move to captionOptions
    /**
     * You can pass own class name to the icon container element.
     */
    iconContainerClass: String,
    /**
     * Pass true to disable <b>input</b> element.
     */
    // TODO: disabled and unchecked should have different appearance
    disabled: Boolean,
    /**
     * Defines container element type of the component
     */
    tag: generateProp.tag(),
    /**
     * Pass any DButton.props to customize button, f.e. { colorScheme: "danger" }
     */
    buttonOptions: generateProp.options<DButtonProps>(BUTTON_DEFAULTS),

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

  setup(props, { slots }) {
    const innerChecked = ref(props.checked); // TODO: what for ???
    // To manipulate get getBoundingClientRect and adjust tooltip position
    // It's a bit of magic - use the same refs name in the render function and return they from the setup()
    // https://markus.oberlehner.net/blog/refs-and-the-vue-3-composition-api/
    const inputRef: Ref<HTMLInputElement | null> = ref(null);
    const { renderCaption } = useCaption(
      props,
      slots,
      styles,
      CAPTION_DEFAULTS
    );

    watch(
      () => props.checked,
      (checked) => {
        innerChecked.value = checked;
      }
    );

    return { innerChecked, inputRef, renderCaption };
  },

  emits: [
    EVENT_NAME.CHANGE,
    EVENT_NAME.INPUT,
    EVENT_NAME.UPDATE_CHECKED,
    EVENT_NAME.UPDATE_VALUE,
  ],

  computed: {
    renderInput(): VNode {
      return (
        <input
          ref={config.inputRef}
          type="radio"
          id={this.label ? String(this.id) : undefined}
          name={String(this.name)}
          checked={this.innerChecked}
          value={this.value}
          disabled={this.disabled}
          tabindex={this.type === TYPE.BASE ? 1 : -1}
          {...this.inputAttrs}
          class={[
            styles[config.inputClassName],
            this.inputClass,
            generateClass.outline(`${BASE_COLOR_SCHEME}-${this.size}`),
            generateClass.size(this.size),
          ]}
          onChange={this.changeHandler}
          onInput={this.inputHandler}
        />
      );
    },

    renderIcon(): VNode[] {
      const iconContainerClasses = [
        styles[config.iconContainerClassName],
        generateClass.border(`${BASE_COLOR_SCHEME}-${this.size}`),
        generateClass.colorScheme(this.colorScheme),
        generateClass.padding(
          this.type === TYPE.BASE ? PADDING.EQUAL : this.padding
        ),
        generateClass.padding(
          `${this.type === TYPE.BASE ? PADDING.EQUAL : this.padding}-${
            this.size
          }`
        ),
        generateClass.rounding(this.rounding),
        generateClass.size(this.size),
        generateClass.transition(this.transition),
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
            generateClass.size(this.size),
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
                  generateClass.transition(this.transition),
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

    renderLabelContent(): VNode | null {
      if (this.$slots.label?.() || this.label) {
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
          {...BUTTON_DEFAULTS}
          content={this.label}
          active={this.innerChecked} // TODO: checked and disabled state should have different appearance
          disabled={this.disabled} // TODO: checked and disabled state should have different appearance
          colorScheme={this.colorScheme}
          padding={this.padding}
          rounding={this.rounding}
          size={this.size}
          transition={this.transition}
          whenClick={this.buttonClickHandler}
          {...this.buttonOptions}
        />
      );
    },

    renderLabel(): VNode {
      const labelClasses = [
        styles[config.labelClassName],
        this.labelClass,
        generateClass.font(this.labelFont || this.size),
      ];
      if (this.disabled) {
        labelClasses.push(styles.__disabled);
      }

      return (
        <label for={String(this.id)} class={labelClasses}>
          {this.renderInput}
          {this.type === TYPE.BASE
            ? [this.renderIcon, this.renderLabelContent]
            : this.renderButton}
        </label>
      );
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
      // TODO: test case
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
   * @slot $slots.caption
   * Use instead of props.caption to fully customize caption content
   * */
  // TODO: input slot ???
  render(): VNode {
    const Tag = this.tag;
    return (
      <Tag
        class={[
          styles[config.className],
          generateClass.minControlWidth(this.size),
        ]}
      >
        {this.renderLabel}
        {this.renderCaption}
      </Tag>
    );
  },
});
