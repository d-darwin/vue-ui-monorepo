import { defineComponent, ref, Transition as Trans } from "vue";
import type { VNode, PropType, InputHTMLAttributes } from "vue";
import { v4 as uuid } from "uuid";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import colorSchemeStyles from "@darwin-studio/ui-codegen/dist/styles/color-scheme.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import useCaption from "@darwin-studio/vue-ui/src/compositions/caption";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import { DCaptionProps } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/types";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
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
     * Defines <i>id</i> attr of the <b>input</b> element.<br>
     * If you don't want to specify it, it will be generated automatically.
     */
    id: generateProp.text(() => uuid()),
    /**
     * Defines is the component is checked by default
     */
    checked: Boolean,
    /**
     * Defines value of the <b>input</b> element
     */
    value: generateProp.text(config.value),
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
    label: generateProp.content(),
    /**
     * You can pass own class name to the <b>label</b> element.
     */
    // TODO: move to labelOptions:
    labelClass: String,
    /**
     * Defines font size of the <b>label</b> element. By default depends on props.size
     */
    // TODO: move to labelOptions:
    labelFont: generateProp.font(),
    /**
     * If not empty renders DCaption below the <b>input</b> element.
     */
    caption: generateProp.content(),
    /**
     * Pass any DCaption.props to customize it, f.e. { type: "error" }
     */
    captionOptions: generateProp.options<DCaptionProps>(config.captionOptions),
    /**
     * Defines offset of DCaption
     */
    captionOffset: generateProp.text(config.captionOffset), // TODO: move to captionOptions
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
    const innerChecked = ref(props.checked); // TODO: what for, remove ???
    const { renderCaption } = useCaption(props, slots, config.captionOptions);

    return { innerChecked, renderCaption };
  },

  emits: [
    EVENT_NAME.CHANGE,
    EVENT_NAME.INPUT,
    EVENT_NAME.UPDATE_CHECKED,
    EVENT_NAME.UPDATE_VALUE,
  ],

  computed: {
    renderIcon(): VNode[] {
      const iconContainerClasses = [
        config.iconContainerClass,
        generateClass.border(this.colorScheme, this.size),
        generateClass.colorScheme(this.colorScheme),
        ...generateClass.padding(PADDING.EQUAL, this.size),
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
            config.iconContainerBackdropClass,
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
                  config.iconClass,
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

    renderInput(): VNode {
      return (
        <input
          type={config.inputType}
          id={this.label ? String(this.id) : undefined}
          checked={this.checked}
          value={this.value}
          disabled={this.disabled}
          {...this.inputAttrs}
          class={[
            config.inputClass,
            generateClass.outline(this.colorScheme, this.size),
            generateClass.size(this.size),
            this.inputClass,
          ]}
          onChange={this.changeHandler}
          onInput={this.inputHandler}
        />
      );
    },

    renderLabelContent(): VNode | null {
      if (this.$slots.label?.() || this.label) {
        return (
          <div class={config.labelInnerClass}>
            {this.$slots.label?.() || this.label}
          </div>
        );
      }

      return null;
    },

    renderLabel(): VNode {
      const labelClasses = [
        config.labelClass,
        this.labelClass,
        generateClass.font(this.labelFont || this.size),
      ];
      if (this.disabled) {
        labelClasses.push(styles.__disabled);
      }

      return (
        <label for={String(this.id)} class={labelClasses}>
          {this.renderInput}
          {this.renderIcon}
          {this.renderLabelContent}
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
   * @slot $slots.caption
   * Use instead of props.caption to fully customize caption content
   * */
  // TODO: input slot ???
  render(): VNode {
    const Tag = this.tag;
    return (
      <Tag class={[config.class, generateClass.minControlWidth(this.size)]}>
        {this.renderLabel}
        {this.renderCaption}
      </Tag>
    );
  },
});
