import {
  defineComponent,
  InputHTMLAttributes,
  mergeProps,
  PropType,
  VNode,
  Transition as Trans,
} from "vue";
import type { Font } from "@darwin-studio/ui-codegen/dist/types/font";
import type { Transition } from "@darwin-studio/ui-codegen/dist/types/transition"; // TODO: shorter path, default export ???
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition"; // TODO: shorter path, default export ???
import transitionStyles from "@darwin-studio/ui-codegen/dist/styles/transition.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import useControlId from "@darwin-studio/vue-ui/src/compositions/control-id";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import type { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import prepareElementSize from "@darwin-studio/vue-ui/src/utils/prepare-element-size";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import { DCaptionAsync as DCaption } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/async";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import type { DCaptionProps } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/types";
import { CAPTION_DEFAULTS } from "./contants";
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
     * Defines initial <i>value</i> attr of the <b>input</b> element
     */
    value: {
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
     * You can pass own class name to the <b>input</b> element.
     */
    // TODO: inputOptions
    inputClass: {
      type: String,
    },
    /**
     * Defines font size of the <b>input</b> element. By default depends on props.size
     */
    inputFont: {
      type: String as PropType<Font>,
    },
    /**
     * You can pass any attributes to the <b>input</b> element.
     */
    inputAttrs: {
      type: Object as PropType<InputHTMLAttributes>,
    },
    /**
     * Defines content of the <b>label</b> element.
     */
    label: {
      type: [String, Number, Object] as PropType<Text | VNode>,
    },
    /**
     * Pass any attrs to customize label, f.e. { class: "someClass" }
     */
    labelOptions: {
      type: Object as PropType<DCaptionProps>, // TODO: what really type ???
      default: () => CAPTION_DEFAULTS,
    },
    /**
     * If not empty renders DCaption below the <b>input</b> element.
     */
    caption: {
      type: [String, Number, Object] as PropType<Text | VNode>,
    },
    /**
     * Pass any DBackdrop.props to customize caption, f.e. { type: "error" }
     */
    captionOptions: {
      type: Object as PropType<DCaptionProps>,
      default: () => CAPTION_DEFAULTS,
    },
    /**
     * Defines offset of DCaption
     */
    captionOffset: {
      types: [String, Number] as PropType<Text>,
      default: config.defaultCaptionOffset,
    },
    // TODO: colorScheme and others
    /**
     * Defines transition type of the component
     */
    transition: {
      type: String as PropType<Transition>,
      default: TRANSITION.FAST, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Pass true to disable attr of the <b>input</b> element.
     */
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
    EVENT_NAME.CHANGE, // TODO: implement
    EVENT_NAME.INPUT, // TODO: implement
    EVENT_NAME.SUBMIT, // TODO: implement
    EVENT_NAME.UPDATE_VALUE, // TODO: implement
  ],

  computed: {
    renderLabel(): VNode {
      return <div>TODO: label</div>;
    },

    renderInput(): VNode {
      return (
        <input
          type={config.inputType}
          value={this.value}
          class={styles[config.inputClassName]}
          onChange={this.changeHandler}
          onInput={this.inputHandler}
        />
      );
    },

    renderCaption(): VNode {
      const transitionClassName = prepareCssClassName(
        codegenConfig.TOKENS.TRANSITION.CSS_CLASS_PREFIX,
        this.transition
      );

      return (
        <Trans
          enterActiveClass={styles.captionTransitionEnterActive}
          leaveActiveClass={styles.captionTransitionLeaveActive}
          appear={true}
        >
          {this.caption && (
            <DCaption
              label={this.caption}
              class={transitionStyles[transitionClassName]}
              style={`--offset: ${prepareElementSize(this.captionOffset)}`}
              {...mergeProps({}, CAPTION_DEFAULTS, this.captionOptions || {})}
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
      // TODO: add or find KEYS
      if (event.key === "Enter") {
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
      <Tag class={styles[config.className]}>
        {this.renderLabel}
        {this.renderInput}
        {this.renderCaption}
      </Tag>
    );
  },
});
