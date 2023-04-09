import { defineComponent } from "vue";
import type {
  PropType,
  VNode,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from "vue";
import { v4 as uuid } from "uuid";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import type { DCaptionProps } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/types";
import useCaption from "@darwin-studio/vue-ui/src/compositions/caption";
import config from "./config";

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
    id: generateProp.text(() => uuid()),
    /**
     * Defines initial <i>value</i> attr of the <b>input</b> element
     */
    value: generateProp.number(),
    // TODO: dataset (not just step)
    // TODO: marks
    // TODO: mark labels
    // TODO: range from => to ?
    /**
     * Pass any track attrs you want
     */
    trackOptions: generateProp.options<HTMLAttributes>(config.trackOptions),
    /**
     * Pass any input attrs you want
     */
    inputOptions: generateProp.options<InputHTMLAttributes>(
      config.inputOptions
    ),
    /**
     * Defines content of the <b>label</b> element.
     */
    label: generateProp.content(),
    /**
     * Pass any attrs to customize label, f.e. { class: "someClass" }
     */
    labelOptions: generateProp.options<LabelHTMLAttributes>(
      config.labelOptions
    ),
    /**
     Defines offset of .label
     */
    labelOffset: generateProp.text(config.labelOffset),
    /**
     * If not empty renders DCaption below the <b>input</b> element.
     */
    caption: generateProp.content(),
    /**
     * Pass any DCaption.props to customize caption, f.e. { type: "error" }
     */
    captionOptions: generateProp.options<DCaptionProps>(config.captionOptions),
    /**
     * Defines offset of DCaption
     */
    captionOffset: generateProp.text(config.captionOffset), // TODO: move to captionOptions
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

  setup(props, { slots }) {
    return useCaption(props, slots, config.captionOptions);
  },

  emits: [EVENT_NAME.CHANGE, EVENT_NAME.INPUT, EVENT_NAME.UPDATE_VALUE],

  computed: {
    classes(): (string | undefined)[] {
      return [
        config.class,
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
          {...config.labelOptions}
          for={String(this.id)}
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
          {...config.trackOptions}
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
        generateClass.outline(this.colorScheme, this.size),
        generateClass.rounding(this.rounding),
        generateClass.transition(this.transition),
      ];
    },

    renderInput(): VNode {
      return (
        <input
          {...config.inputOptions}
          id={this.$slots.label?.() || this.label ? String(this.id) : undefined}
          value={this.value}
          disabled={this.disabled}
          class={this.inputClasses}
          onChange={this.changeHandler}
          onInput={this.inputHandler}
          {...this.inputOptions}
        />
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
