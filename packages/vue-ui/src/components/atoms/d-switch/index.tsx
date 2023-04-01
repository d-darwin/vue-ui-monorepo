import { defineComponent, type PropType, type VNode } from "vue";
import { v4 as uuid } from "uuid";
import colorSchemeStyles from "@darwin-studio/ui-codegen/dist/styles/color-scheme.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import type { DAspectRatioProps } from "@darwin-studio/vue-ui/src/components/containers/d-aspect-ratio/types";
import { DAspectRatioAsync as DAspectRatio } from "@darwin-studio/vue-ui/src/components/containers/d-aspect-ratio/async";
import type { DCaptionProps } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/types"; // TODO: move to /d-caption/async ??
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
import useCaption from "@darwin-studio/vue-ui/src/compositions/caption";
import type { Values, Value } from "./types";
import { ASPECT_RATIO_DEFAULTS, CAPTION_DEFAULTS } from "./constants";
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
    id: generateProp.text(() => uuid()), // TODO: use instead of useControlId ???
    /**
     * Defines if the component at the truthy state by default
     */
    checked: Boolean,
    /**
     * Replace default true/false values with your own.
     */
    // TODO: naming, combine with labels ???
    values: generateProp.options<Values>(),
    /**
     * Add labels to the component states.
     */
    // TODO: naming, combine with values ???
    labels: generateProp.options<Values>(),
    /**
     * You can pass own class name to the <b>input</b> element.
     */
    // TODO: inputOptions
    inputClass: String,
    /**
     * You can pass own class name to the <b>label</b> element.
     */
    // TODO: labelOptions
    labelClass: String, // TODO: labelOptions:
    /**
     * Defines font size of the <b>label</b> element. By default depends on props.size
     */
    labelFont: generateProp.font(), // TODO: labelOptions:
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
    captionOffset: generateProp.text(config.captionOffset),
    /**
     * Defines appearance of the component
     */
    colorScheme: generateProp.colorScheme(),
    /**
     * Defines common font size of the component
     */
    font: generateProp.font(), // TODO: merge with size ???
    /**
     * Defines corner rounding of the icon container element
     */
    rounding: generateProp.rounding(ROUNDING.FULL),
    /**
     * Defines size of the component
     */
    size: generateProp.size(SIZE.TINY),
    /**
     * Defines transition type of the component
     */
    transition: generateProp.transition(),
    /**
     * Pass true to disable <b>input</b> element.
     */
    disabled: Boolean,
    // TODO: readonly state ???
    // TODO: indeterminate state ???
    /**
     * Defines container element type of the component
     */
    tag: generateProp.tag(),
    /**
     * Pass any DAspectRatio.props to customize aspect ratio container, f.e. { class: "someClass" }
     */
    aspectRatioOptions: generateProp.options<DAspectRatioProps>(
      ASPECT_RATIO_DEFAULTS
    ),

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

  setup(props, { slots }) {
    return useCaption(props, slots, styles, CAPTION_DEFAULTS);
  },

  emits: [
    EVENT_NAME.CHANGE,
    EVENT_NAME.INPUT,
    EVENT_NAME.UPDATE_CHECKED,
    EVENT_NAME.UPDATE_VALUE,
  ],

  computed: {
    labelClasses(): (string | undefined)[] {
      return [
        styles[config.labelClassName],
        this.disabled ? styles.__disabled : undefined, // TODO: config
        this.labelClass,
        generateClass.font(this.labelFont || this.font || this.size),
      ];
    },
    // TODO: add label generator ???
    renderFalsyLabel(): VNode | null {
      if (this.labels?.falsy || this.$slots.labelFalsy) {
        return (
          <label for={String(this.id) || undefined} class={this.labelClasses}>
            {this.$slots.labelFalsy?.() || this.labels?.falsy}
          </label>
        );
      }

      return null;
    },

    renderThumb(): VNode | VNode[] {
      return (
        <div
          class={[
            styles[config.thumbClassName],
            generateClass.font(this.font || this.size),
            generateClass.rounding(this.rounding),
            generateClass.size(this.size),
            generateClass.transition(this.transition),
          ]}
        >
          {this.$slots.thumb?.() || (
            <div
              class={[
                styles[config.thumbInnerClassName],
                generateClass.rounding(this.rounding),
                generateClass.transition(this.transition),
              ]}
            />
          )}
        </div>
      );
    },

    inputContainerClasses(): (string | undefined)[] {
      return [
        this.disabled ? styles.__disabled : undefined,
        this.disabled ? colorSchemeStyles.__disabled : undefined,
        generateClass.border(`${this.colorScheme}-${this.size}`),
        generateClass.colorScheme(this.colorScheme),
        generateClass.outline(`${this.colorScheme}-${this.size}`),
        generateClass.rounding(this.rounding),
        generateClass.size(this.size),
        generateClass.transition(this.transition),
      ];
    },

    inputClasses(): (string | undefined)[] {
      return [
        styles[config.inputClassName],
        this.inputClass,
        generateClass.border(`${this.colorScheme}-${this.size}`),
        generateClass.outline(`${this.colorScheme}-${this.size}`),
        generateClass.rounding(this.rounding),
      ];
    },

    renderInput(): VNode {
      return (
        <DAspectRatio
          {...ASPECT_RATIO_DEFAULTS}
          /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
          // @ts-ignore TODO
          for={this.id}
          class={this.inputContainerClasses}
          {...this.aspectRatioOptions}
        >
          <input
            id={String(this.id) || undefined}
            value={this.values?.truthy} // TODO: is it right ???
            checked={this.checked || undefined}
            aria-checked={this.checked || undefined}
            disabled={this.disabled || undefined}
            aria-disabled={this.disabled || undefined}
            class={this.inputClasses}
            type="checkbox" // TODO: _DEFAULTS
            role="switch" // TODO: _DEFAULTS
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
        return (
          <label for={String(this.id) || undefined} class={this.labelClasses}>
            {this.$slots.labelTruthy?.() || this.labels?.truthy}
          </label>
        );
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
      this.whenInput?.(value);
    },
  },
  /**
   * @slot $slots.labelFalsy
   * Use instead of props.labels.falsy to fully customize falsy label content
   * */
  /**
   * @slot $slots.labelTruthy
   * Use instead of props.labels.truthy to fully customize truthy label content
   * */
  /**
   * @slot $slots.caption
   * Use instead of props.caption to fully customize caption content
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
        {this.renderCaption}
      </Tag>
    );
  },
});
