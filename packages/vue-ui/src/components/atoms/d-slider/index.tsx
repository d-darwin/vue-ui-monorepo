import {
  defineComponent,
  mergeProps,
  PropType,
  VNode,
  Transition as Trans,
  LabelHTMLAttributes,
  InputHTMLAttributes,
} from "vue";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import useControlId from "@darwin-studio/vue-ui/src/compositions/control-id";
import prepareHtmlSize from "@darwin-studio/vue-ui/src/utils/prepare-html-size";
import getCommonCssClass from "@darwin-studio/vue-ui/src/utils/get-common-css-class";
import generateCommonProp from "@darwin-studio/vue-ui/src/utils/prop-factories/generate-common-prop";
import generateOptionsProp from "@darwin-studio/vue-ui/src/utils/prop-factories/generate-options-prop";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import { EVENT_KEY } from "@darwin-studio/vue-ui/src/constants/event-key";
import { TOKEN_NAME } from "@darwin-studio/vue-ui/src/constants/token-name";
import { DCaptionAsync as DCaption } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/async";
import type { DCaptionProps } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/types";
import { CAPTION_DEFAULTS, INPUT_DEFAULTS, LABEL_DEFAULTS } from "./contants";
import config from "./config";
import styles from "./index.css?module";

/**
 * Implements ["slider"](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/slider_role) and ["spinbutton"](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/spinbutton_role) input widget roles.<br />
 * Renders custom <b>input</b> element with <i>type="range"</i> and <i>role="slider | spinbutton"</i>
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Defines <i>id</i> attr of the <b>input</b> element.<br>
     * If you don't want to specify it, it will be generated automatically.
     */
    id: {
      type: [String, Number] as PropType<Text>,
    },
    /**
     * Defines initial <i>value</i> attr of the <b>input</b> element
     */
    value: {
      type: [String, Number] as PropType<Text>,
    },
    /**
     * Pass any input attrs you want
     */
    inputOptions: generateOptionsProp<InputHTMLAttributes>(INPUT_DEFAULTS),
    /**
     * Defines content of the <b>label</b> element.
     */
    label: generateCommonProp.content(),
    /**
     * Pass any attrs to customize label, f.e. { class: "someClass" }
     */
    labelOptions: generateOptionsProp<LabelHTMLAttributes>(LABEL_DEFAULTS),
    /**
     Defines offset of .label
     */
    labelOffset: {
      types: [String, Number] as PropType<Text>,
      default: config.defaultLabelOffset,
    },
    /**
     * If not empty renders DCaption below the <b>input</b> element.
     */
    caption: generateCommonProp.content(),
    /**
     * Pass any DBackdrop.props to customize caption, f.e. { type: "error" }
     */
    captionOptions: generateOptionsProp<DCaptionProps>(CAPTION_DEFAULTS),
    /**
     * Defines offset of DCaption
     */
    captionOffset: {
      types: [String, Number] as PropType<Text>,
      default: config.defaultCaptionOffset,
    },
    /**
     * Defines appearance of the component
     */
    colorScheme: generateCommonProp.colorScheme(),
    /**
     * Defines rounding of the component
     */
    rounding: generateCommonProp.rounding(ROUNDING.FULL),
    /**
     * Defines size of the component
     */
    size: generateCommonProp.size(),
    /**
     * Defines transition type of the component
     */
    transition: generateCommonProp.transaction(),
    /**
     * Pass true to disable attr of the <b>input</b> element.
     */
    disabled: {
      type: Boolean,
    },
    /**
     * Defines container element type of the component
     */
    tag: generateCommonProp.tag(),
    // TODO: range? from, to ?
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
      if (!this.$slots.label?.() && !this.label) {
        return null;
      }
      // TODO: enableHtml
      return (
        <label
          for={this.controlId}
          style={`--offset: ${this.labelOffset}`}
          class={getCommonCssClass(TOKEN_NAME.FONT, this.size)}
          {...Object.assign({}, LABEL_DEFAULTS, this.labelOptions || {})}
        >
          {this.$slots.label?.() || this.label}
        </label>
      );
    },

    renderInput(): VNode {
      return (
        <input
          id={this.controlId}
          value={this.value}
          class={[
            getCommonCssClass(TOKEN_NAME.COLOR_SCHEME, this.colorScheme),
            getCommonCssClass(TOKEN_NAME.MIN_CONTROL_WIDTH, this.size),
            getCommonCssClass(TOKEN_NAME.ROUNDING, this.rounding),
            getCommonCssClass(TOKEN_NAME.TRANSITION, this.transition),
          ]}
          onChange={this.changeHandler}
          onInput={this.inputHandler}
          {...Object.assign({}, INPUT_DEFAULTS, this.inputOptions || {})}
        />
      );
    },

    renderCaption(): VNode {
      return (
        <Trans
          enterActiveClass={styles.captionTransitionEnterActive}
          leaveActiveClass={styles.captionTransitionLeaveActive}
          appear={true}
        >
          {this.caption && (
            <DCaption
              label={this.caption}
              class={getCommonCssClass(TOKEN_NAME.TRANSITION, this.transition)}
              style={`--offset: ${prepareHtmlSize(this.captionOffset)}`}
              {...mergeProps(
                { font: this.size },
                CAPTION_DEFAULTS,
                this.captionOptions || {}
              )}
            />
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

  render(): VNode {
    const Tag = this.tag;

    return (
      <Tag
        class={[
          styles[config.className],
          getCommonCssClass(TOKEN_NAME.SIZE, this.size),
        ]}
      >
        {this.renderLabel}
        {this.renderInput}
        {this.renderCaption}
      </Tag>
    );
  },
});
