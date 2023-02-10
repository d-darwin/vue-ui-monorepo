import { defineComponent, PropType, VNode } from "vue";
import type { Font } from "@darwin-studio/ui-codegen/dist/types/font"; // TODO: shorter path, default export ???
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
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
import fontStyles from "@darwin-studio/ui-codegen/dist/styles/font.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
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
    /**
     * Defines if the component at the truthy state by default
     */
    checked: {
      type: Boolean,
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
     * Defines common font size of the component
     */
    font: {
      type: String as PropType<Font>,
      default: FONT.SMALL,
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
    renderFalsyLabel(): VNode | null {
      if (this.labels?.falsy) {
        // TODO: slot
        return (
          <label for={this.controlId} class={styles.label}>
            {this.labels.falsy}
          </label>
        );
      }

      return null;
    },

    renderInput(): VNode {
      // TODO: aria-checked=???
      // TODO: aria-disabled=???
      // TODO: aria-readonly=???
      return (
        <label for={this.controlId} class={styles.track}>
          <input
            id={this.controlId}
            checked={this.checked}
            class={styles.input}
            type="checkbox"
            role="switch"
          />
          <div class={styles.thumb} />
        </label>
      );
    },

    renderTruthyLabel(): VNode | null {
      if (this.labels?.truthy) {
        // TODO: slot
        return (
          <label for={this.controlId} class={styles.label}>
            {this.labels.truthy}
          </label>
        );
      }

      return null;
    },

    // TODO: control-notification: error (danger?) | warning  | notice(info?)| success
    // TODO: how to avoid layout shift
    renderError(): VNode | null {
      if (this.error || this.$slots.error) {
        const fontClassName = prepareCssClassName(
          codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
          this.errorFont || this.font || this.size
        );
        const classes = [
          styles[config.errorClassName],
          fontStyles[fontClassName],
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

  // TODO: describe slots
  render(): VNode {
    const Tag = this.tag;

    return (
      <Tag class={styles[config.className]}>
        <div class={styles.wrapper}>
          {this.renderFalsyLabel}
          {this.renderInput}
          {this.renderTruthyLabel}
        </div>
        {this.renderError}
      </Tag>
    );
  },
});
