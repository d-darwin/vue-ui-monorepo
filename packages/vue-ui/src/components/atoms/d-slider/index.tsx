import {
  defineComponent,
  Transition as Trans,
  type PropType,
  type VNode,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
} from "vue";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import useControlId from "@darwin-studio/vue-ui/src/compositions/control-id";
import prepareHtmlSize from "@darwin-studio/vue-ui/src/utils/prepare-html-size";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import { DCaptionAsync as DCaption } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/async";
import type { DCaptionProps } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/types";
import {
  CAPTION_DEFAULTS,
  INPUT_DEFAULTS,
  LABEL_DEFAULTS,
  TRACK_DEFAULTS,
} from "./contants";
import config from "./config";
import styles from "./index.css?module";

/**
 * Renders custom <b>input</b> element with <i>type="range"</i> and <i>role="slider"</i>.<br />
 * Implements ["slider"](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/slider_role).
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Defines <i>id</i> attr of the <b>input</b> element.<br>
     * If you don't want to specify it, it will be generated automatically.
     */
    id: generateProp.text(),
    /**
     * Defines initial <i>value</i> attr of the <b>input</b> element
     */
    value: generateProp.number(),
    /**
     * Defines min attr of the input
     */
    min: generateProp.number(config.defaultMin),
    /**
     * Defines max attr of the input
     */
    max: generateProp.number(config.defaultMax),
    /**
     * Defines step attr of the input
     */
    step: generateProp.number(config.defaultStep),
    // TODO: dataset (not just step)
    // TODO: marks
    // TODO: mark labels
    // TODO: range from => to ?
    /**
     * Pass any track attrs you want
     */
    trackOptions: generateProp.options<HTMLAttributes>(TRACK_DEFAULTS),
    /**
     * Pass any input attrs you want
     */
    inputOptions: generateProp.options<InputHTMLAttributes>(INPUT_DEFAULTS),
    /**
     * Defines content of the <b>label</b> element.
     */
    label: generateProp.content(),
    /**
     * Pass any attrs to customize label, f.e. { class: "someClass" }
     */
    labelOptions: generateProp.options<LabelHTMLAttributes>(LABEL_DEFAULTS),
    /**
     Defines offset of .label
     */
    labelOffset: generateProp.text(config.defaultLabelOffset),
    /**
     * If not empty renders DCaption below the <b>input</b> element.
     */
    caption: generateProp.content(),
    /**
     * Pass any DCaption.props to customize caption, f.e. { type: "error" }
     */
    captionOptions: generateProp.options<DCaptionProps>(CAPTION_DEFAULTS),
    /**
     * Defines offset of DCaption
     */
    captionOffset: generateProp.text(config.defaultCaptionOffset),
    /**
     * Defines appearance of the component
     */
    colorScheme: generateProp.colorScheme(),
    /**
     * Defines rounding of the component
     */
    rounding: generateProp.rounding(ROUNDING.FULL),
    /**
     * Defines size of the component
     */
    size: generateProp.size(),
    /**
     * Defines transition type of the component
     */
    transition: generateProp.transition(),
    /**
     * Pass true to disable attr of the <b>input</b> element.
     */
    disabled: Boolean,
    /**
     * Defines container element type of the component
     */
    tag: generateProp.tag(),

    /**
     * Alternative way to catch change event
     */
    whenChange: Function as PropType<(value: string) => void | Promise<void>>,
    /**
     * Alternative way to catch input event
     */
    whenInput: Function as PropType<(value: string) => void | Promise<void>>,
  },

  setup(props) {
    return useControlId(props);
  },

  emits: [EVENT_NAME.CHANGE, EVENT_NAME.INPUT, EVENT_NAME.UPDATE_VALUE],

  computed: {
    classes(): (string | undefined)[] {
      return [
        styles[config.className],
        generateClass.minControlWidth(this.size),
        generateClass.size(this.size),
      ];
    },

    labelClasses(): (string | undefined)[] {
      return [generateClass.font(this.size)];
    },

    renderLabel(): VNode | null {
      if (!this.$slots.label?.() && !this.label) {
        return null;
      }

      return (
        <label
          {...LABEL_DEFAULTS}
          for={this.controlId}
          class={this.labelClasses}
          style={`--offset: ${this.labelOffset}`}
          {...this.labelOptions}
        >
          {this.$slots.label?.() || this.label}
        </label>
      );
    },

    trackClasses(): (string | undefined)[] {
      return [
        generateClass.colorScheme(this.colorScheme),
        generateClass.rounding(this.rounding),
      ];
    },

    renderTrack(): VNode {
      return (
        <div
          {...TRACK_DEFAULTS}
          class={this.trackClasses}
          {...this.trackOptions}
        >
          {this.$slots.track?.()}
        </div>
      );
    },

    inputClasses(): (string | undefined)[] {
      return [
        generateClass.colorScheme(this.colorScheme),
        generateClass.outline(`${this.colorScheme}-${this.size}`),
        generateClass.rounding(this.rounding),
        generateClass.transition(this.transition),
      ];
    },

    renderInput(): VNode {
      return (
        <input
          {...INPUT_DEFAULTS}
          id={this.$slots.label?.() || this.label ? this.controlId : undefined}
          value={this.value}
          min={this.min}
          max={this.max}
          step={this.step}
          role={config.defaultRole}
          disabled={this.disabled}
          class={this.inputClasses}
          onChange={this.changeHandler}
          onInput={this.inputHandler}
          {...this.inputOptions}
        />
      );
    },

    captionClasses(): (string | undefined)[] {
      return [generateClass.transition(this.transition)];
    },

    renderCaption(): VNode {
      return (
        <Trans
          enterActiveClass={styles.captionTransitionEnterActive}
          leaveActiveClass={styles.captionTransitionLeaveActive}
          appear={true}
        >
          {(this.$slots.caption?.() || this.caption) && (
            <DCaption
              {...CAPTION_DEFAULTS}
              font={this.size}
              class={this.captionClasses}
              style={`--offset: ${prepareHtmlSize(this.captionOffset)}`}
              {...this.captionOptions}
            >
              {this.$slots.caption?.() || this.caption}
            </DCaption>
          )}
        </Trans>
      );
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
  },

  /**
   * @slot $slots.label
   * Use instead of props.label to fully customize label
   * */
  /**
   * @slot $slots.track
   * Use instead of props.track to fully customize track
   * */
  /**
   * @slot $slots.caption
   * Use instead of props.caption to fully customize caption
   * */
  render(): VNode {
    const Tag = this.tag;

    return (
      <Tag class={this.classes}>
        {this.renderLabel}
        {this.renderTrack}
        {this.renderInput}
        {this.renderCaption}
      </Tag>
    );
  },
});
