import { defineComponent, VNode, PropType, InputHTMLAttributes } from "vue";
import type { ColorScheme } from "@darwin-studio/vue-ui-codegen/dist/types/color-scheme"; // TODO: shorter path, default export ???
import { COLOR_SCHEME } from "@darwin-studio/vue-ui-codegen/dist/constants/color-scheme"; // TODO: shorter path, default export ???
import type { Font } from "@darwin-studio/vue-ui-codegen/dist/types/font"; // TODO: shorter path, default export ???
import { FONT } from "@darwin-studio/vue-ui-codegen/dist/constants/font"; // TODO: shorter path, default export ???
import type { Size } from "@darwin-studio/vue-ui-codegen/dist/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
// import type { Transition } from "@darwin-studio/vue-ui-codegen/dist/types/transition"; // TODO: shorter path, default export ???
// import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition"; // TODO: shorter path, default export ???
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name"; // TODO: fix relative path
import fontStyles from "@darwin-studio/vue-ui-codegen/dist/styles/font.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import outlineStyles from "@darwin-studio/vue-ui-codegen/dist/styles/outline.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import minControlWidthStyles from "@darwin-studio/vue-ui-codegen/dist/styles/min-control-width.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/vue-ui-codegen/config.json";
import useControlId from "@darwin-studio/vue-ui/src/compositions/control-id";
import type { Text } from "@/types/text";
import type { TagName } from "@/types/tag-name";
import { BASE_COLOR_SCHEME } from "./constants";
import styles from "./index.module.css";
import config from "./config";

// TODO: optional state (only for group)
export default defineComponent({
  name: config.name,

  props: {
    /**
     * TODO: Add description
     */
    value: {
      type: [String, Number] as PropType<Text>,
    },
    /**
     * TODO: Add description
     */
    checked: {
      type: Boolean,
    },
    /**
     * TODO: Add description
     */
    colorScheme: {
      type: String as PropType<ColorScheme>,
      default: COLOR_SCHEME.PRIMARY, // TODO: gent defaults base on actual values, not hardcoded
    },
    // TODO: rounding
    /**
     * TODO: Add description
     */
    // TODO: fontSize and size separately ???
    size: {
      type: String as PropType<Size>,
      default: SIZE.MEDIUM, // TODO: gent defaults base on actual values, not hardcoded
    },
    // TODO: rename transitionType ???
    /*transition: {
      type: String as PropType<Transition>,
      default: TRANSITION.FAST, // TODO: gent defaults base on actual values, not hardcoded
    },*/
    // TODO: rounding ???
    /**
     * Defines <i>id</i> attr of the <b>input</b> tag.<br>
     * If you don't want to specify it, it will be generated automatically.
     */
    id: {
      type: [String, Number] as PropType<Text>,
    },
    /**
     * TODO: Add description
     */
    inputClass: {
      type: String,
    },
    /**
     * TODO: Add description
     */
    inputAttrs: {
      type: Object as PropType<InputHTMLAttributes>,
    },
    /**
     * Defines content of the <b>label</b> tag.
     */
    label: {
      type: [String, Number] as PropType<Text>,
    },
    /**
     * TODO: Add description
     */
    // TODO: enableLabelHtml instead ???
    labelHtml: {
      // TODO: warning
      type: String,
    },
    // TODO: labelSlot???
    /**
     * TODO: Add description
     */
    labelFont: {
      type: String as PropType<Font>,
      default: FONT.MEDIUM,
    },
    /**
     * TODO: Add description
     */
    labelClass: {
      type: String,
    },
    // TODO: do we really need it ???
    preventDefault: {
      type: Boolean,
    },
    /**
     * TODO: Add description
     */
    // TODO: - or add one props.inputAttrs
    disabled: {
      type: Boolean,
    },
    /**
     * If not empty renders as an error string below the <b>input</b> tag.
     */
    error: {
      type: [String, Number] as PropType<Text>,
    },
    /**
     * TODO: Add description
     */
    // TODO: enableErrorHtml instead ???
    errorHtml: {
      // TODO: warning
      type: String,
    },
    /**
     * TODO: Add description
     */
    errorFont: {
      type: String as PropType<Font>,
      default: FONT.MEDIUM,
    },
    /**
     * TODO: Add description
     */
    errorClass: {
      type: String,
    },
    /**
     * TODO: Add description
     */
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.DIV,
    },
    whenChange: {
      type: Function as PropType<
        (checked?: boolean, value?: Text) => void | Promise<void>
      >,
    },
  },

  setup(props) {
    return useControlId(props);
  },

  computed: {
    renderInput(): VNode {
      // TODO: outline and size and colorScheme separately ???
      const outlineClassName = prepareCssClassName(
        codegenConfig.TOKENS.OUTLINE.CSS_CLASS_PREFIX,
        `${BASE_COLOR_SCHEME}-${this.size}`
      );

      return (
        <input
          type="checkbox"
          id={this.label || this.id ? this.controlId : undefined}
          checked={this.checked}
          value={this.value}
          disabled={this.disabled}
          {...this.inputAttrs}
          class={[
            styles[config.inputClassName],
            outlineStyles[outlineClassName],
            this.inputClass,
          ]}
          onChange={this.changeHandler}
          // TODO: onInput ???
        />
      );
    },

    // TODO: make composition / util ???
    renderLabel(): VNode | null {
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.labelFont
      );

      if (this.label || this.$slots.label) {
        return (
          <label
            for={this.controlId}
            class={[
              styles[config.labelClassName],
              fontStyles[fontClassName],
              this.labelClass,
            ]}
          >
            {this.$slots.label?.() || this.label}
          </label>
        );
      }

      // TODO: reduce
      if (this.labelHtml) {
        return (
          <label
            for={this.controlId}
            class={[
              styles[config.labelClassName],
              fontStyles[fontClassName],
              this.labelClass,
            ]}
            v-html={this.labelHtml}
          />
        );
      }

      return null;
    },

    // TODO: make composition / util ???
    // TODO: control-notification component: error (danger?) | warning  | notice(info?)| success
    renderError(): VNode | null {
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.errorFont
      );

      if (this.error || this.$slots.error) {
        /*TODO: should it be a tooltip to avoid layout shift ?*/
        return (
          <div
            class={[
              styles[config.errorClassName],
              fontStyles[fontClassName],
              this.errorClass,
            ]}
          >
            {this.$slots.error?.() || this.error}
          </div>
        );
      }

      // TODO: reduce
      if (this.errorHtml) {
        return (
          <div
            class={[
              styles[config.errorClassName],
              fontStyles[fontClassName],
              this.errorClass,
            ]}
            v-html={this.errorHtml}
          />
        );
      }

      return null;
    },
  },

  methods: {
    changeHandler(event: Event): void {
      const checked = (event.target as HTMLInputElement).checked;
      const value = (event.target as HTMLInputElement).value;

      this.$emit("change", checked, checked ? value : undefined);
      this.$emit("update:checked", checked);
      this.$emit("update:value", checked ? value : undefined);
      this.whenChange?.(checked, checked ? value : undefined);
    },
  },

  render(): VNode {
    const Tag = this.tag;

    const minControlWidthClassName = prepareCssClassName(
      codegenConfig.TOKENS.MIN_CONTROL_WIDTH.CSS_CLASS_PREFIX,
      `${this.size}-${codegenConfig.TOKENS.MIN_CONTROL_WIDTH.CSS_CLASS_SUFFIX}`
    );

    return (
      <Tag
        class={[
          styles[config.className],
          minControlWidthStyles[minControlWidthClassName],
        ]}
      >
        {this.renderInput}
        {this.renderLabel}
        {/*TODO: transition*/}
        {this.renderError}
      </Tag>
    );
  },
});
