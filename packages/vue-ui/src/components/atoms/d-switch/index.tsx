import { defineComponent, PropType, VNode } from "vue";
import type { Font } from "@darwin-studio/ui-codegen/dist/types/font"; // TODO: shorter path, default export ???
import type { ColorScheme } from "@darwin-studio/ui-codegen/dist/types/color-scheme"; // TODO: shorter path, default export ???
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import type { Padding } from "@darwin-studio/ui-codegen/dist/types/padding"; // TODO: shorter path, default export ???
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding"; // TODO: shorter path, default export ???
import type { Rounding } from "@darwin-studio/ui-codegen/dist/types/rounding"; // TODO: shorter path, default export ???
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding"; // TODO: shorter path, default export ???
import type { Size } from "@darwin-studio/ui-codegen/dist/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import type { Transition } from "@darwin-studio/ui-codegen/dist/types/transition"; // TODO: shorter path, default export ???
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition"; // TODO: shorter path, default export ???
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import useControlId from "@darwin-studio/vue-ui/src/compositions/control-id";
import type { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import type { Values, Value } from "./types";
import config from "./config";
import styles from "./index.css?module";

/** TODO: description, ARIA
 * The components renders switch (has true / false value) or toggle (has custom values).
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Defines <i>id</i> attr of the <b>input</b> element
     */
    id: {
      type: [String, Number] as PropType<Text>,
    },
    value: {
      type: [String, Number, Boolean] as PropType<Value>,
    },
    /**
     * Replace default true/false values with your own.
     */
    values: {
      // TODO: naming, combine with labels ???
      type: Object as PropType<Values>,
    },
    /**
     * Add labels to the component states.
     */
    labels: {
      // TODO: naming, combine with values ???
      type: Object as PropType<Values>,
    },
    /**
     * You can pass own class name to the <b>input</b> element.
     */
    inputClass: {
      type: String,
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
     * Pass true to disable <b>input</b> element.
     */
    // TODO: plus readonly ???
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
      type: Function as PropType<(value?: Value) => void | Promise<void>>,
    },
  },

  setup(props) {
    return useControlId(props);
  },

  emits: [EVENT_NAME.CHANGE, EVENT_NAME.UPDATE_VALUE],

  computed: {
    renderFalsyLabel(): VNode {
      // TODO: slot
      return <div>renderFalsyLabel</div>;
    },

    renderInput(): VNode {
      // TODO: role="switch"
      // TODO: aria-checked=???
      // TODO: aria-disabled=???
      // TODO: aria-readonly=???
      return <div>renderInput</div>;
    },

    renderTruthyLabel(): VNode {
      // TODO: slot
      return <div>renderTruthyLabel</div>;
    },

    renderError(): VNode {
      // TODO: slot
      return <div>renderError</div>;
    },
  },

  render(): VNode {
    return (
      // TODO: tag
      <div class={styles[config.className]}>
        {this.renderFalsyLabel}
        {this.renderInput}
        {this.renderTruthyLabel}
        {this.renderError}
      </div>
    );
  },
});
