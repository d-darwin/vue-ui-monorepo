import {
  defineComponent,
  type CSSProperties,
  type InputHTMLAttributes,
  type PropType,
  type VNode,
} from "vue";
import { v4 as uuid } from "uuid";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import { EVENT_KEY } from "@darwin-studio/vue-ui/src/constants/event-key";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
import type { DCaptionProps } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/types";
import useCaption from "@darwin-studio/vue-ui/src/compositions/caption";
import type { InputTypes } from "./types";
import { INPUT_TYPE, BASE_COLOR_SCHEME, CAPTION_DEFAULTS } from "./constants";
import config from "./config";
import styles from "./index.css?module";

// TODO: mask ???
// TODO: inverse (dark) color scheme ???
/**
 * Renders <b>input</b> element with label, error and icons slots.
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Defines <i>id</i> attr of the <b>input</b> element
     */
    id: generateProp.text(() => uuid()), // TODO: use instead of useControlId ???
    /**
     * Defines initial <i>value</i> attr of the <b>input</b> element
     */
    value: generateProp.text(),
    /**
     * Defines initial <i>placeholder</i> attr of the <b>input</b> element
     */
    placeholder: String,
    /**
     * Defines padding type of the <b>input</b> element
     */
    padding: generateProp.padding(),
    /**
     * Defines corner rounding of the <b>input</b> element
     */
    rounding: generateProp.rounding(),
    /**
     * Defines size of the component
     */
    // TODO: fontSize and size separately ???
    size: generateProp.size(),
    /**
     * Defines transition type of the component
     */
    transition: generateProp.transition(),
    /**
     * Defines <i>type</i> attr of the <b>input</b> element
     */
    // TODO: move to inputOptions
    inputType: generateProp.string<InputTypes>(INPUT_TYPE.TEXT),
    // TODO: doesnt work properly (((
    /**
     * Defines <i>size</i> attr of the <b>input</b> element.<br>
     */
    // TODO: move to inputOptions
    inputSize: generateProp.number(1),
    /**
     * You can pass own class name to the <b>input</b> element.
     */
    // TODO: move to inputOptions
    inputClass: String,
    /**
     * Defines font size of the <b>input</b> element. By default depends on props.size
     */
    // TODO: move to inputOptions
    inputFont: generateProp.font(undefined, true),
    /**
     * You can pass any attributes to the <b>input</b> element.
     */
    // TODO: move to inputOptions
    inputAttrs: generateProp.options<InputHTMLAttributes>(),
    /**
     * Defines content of the <b>label</b> element.
     */
    label: generateProp.content(),
    /**
     * You can pass own class name to the <b>label</b> element.
     */
    // TODO: move to labelOptions
    labelClass: String,
    /**
     * Defines font size of the <b>label</b> element. By default depends on props.size
     */
    // TODO: move to labelOptions
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

  setup(props, { slots }) {
    return useCaption(props, slots, styles, CAPTION_DEFAULTS);
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
        const bindings = {
          for: String(this.id),
          class: [
            styles[config.labelClassName],
            this.labelClass,
            generateClass.font(this.labelFont || this.size),
          ],
        };

        return (
          <label {...bindings}>{this.$slots.label?.() || this.label}</label>
        );
      }

      return null;
    },

    inputClasses(): (string | undefined)[] {
      return [
        styles[config.inputClassName],
        this.inputClass,
        generateClass.border(`${BASE_COLOR_SCHEME}-${this.size}`),
        generateClass.font(this.inputFont || this.size),
        generateClass.outline(`${BASE_COLOR_SCHEME}-${this.size}`),
        generateClass.padding(this.padding),
        generateClass.padding(`${this.padding}-${this.size}`),
        generateClass.rounding(this.rounding),
        generateClass.size(this.size),
        generateClass.transition(this.transition),
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
          id={this.label ? String(this.id) : undefined}
          value={this.value}
          placeholder={this.placeholder}
          disabled={this.disabled}
          type={this.inputType}
          size={this.inputSize} // TODO: why warning ???
          class={this.inputClasses}
          style={this.inputStyles} // TODO: why warning ???
          onChange={this.changeHandler} // TODO: why warning ???
          onInput={this.inputHandler} // TODO: why warning ???
          onKeyup={this.keyupHandler}
          {...this.inputAttrs}
        />
      );

      if (this.hasSlot) {
        return (
          <div class={styles[config.inputContainerClassName]}>
            {this.$slots.before && (
              <div
                class={[
                  styles[config.beforeContainerClass],
                  generateClass.size(this.size),
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
                  generateClass.size(this.size),
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
      if (event.key === EVENT_KEY.Enter) {
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

  /*TODO: why vue-docgen cant' detect not default slots ???*/
  /**
   * @slot $slots.before
   * Any content before the input element
   * */
  /**
   * @slot $slots.after
   * Any content after the input element
   * */
  /**
   * @slot $slots.label
   * Use instead of props.label to fully customize label content
   * */
  /**
   * @slot $slots.caption
   * Use instead of props.caption to fully customize caption content
   * */
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
        {this.renderInput}
        {this.renderCaption}
      </Tag>
    );
  },
});
