import { defineComponent, PropType, VNode } from "vue";
import type { Font } from "@darwin-studio/vue-ui-codegen/dist/types/font"; // TODO: shorter path, default export ???
import { FONT } from "@darwin-studio/vue-ui-codegen/dist/constants/font"; // TODO: shorter path, default export ???
import type { Padding } from "@darwin-studio/vue-ui-codegen/dist/types/padding"; // TODO: shorter path, default export ???
import { PADDING } from "@darwin-studio/vue-ui-codegen/dist/constants/padding"; // TODO: shorter path, default export ???
import type { Rounding } from "@darwin-studio/vue-ui-codegen/dist/types/rounding"; // TODO: shorter path, default export ???
import { ROUNDING } from "@darwin-studio/vue-ui-codegen/dist/constants/rounding"; // TODO: shorter path, default export ???
import type { Size } from "@darwin-studio/vue-ui-codegen/dist/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import type { Transition } from "@darwin-studio/vue-ui-codegen/dist/types/transition"; // TODO: shorter path, default export ???
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition"; // TODO: shorter path, default export ???
import borderStyles from "@darwin-studio/vue-ui-codegen/dist/styles/border.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import fontStyles from "@darwin-studio/vue-ui-codegen/dist/styles/font.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import outlineStyles from "@darwin-studio/vue-ui-codegen/dist/styles/outline.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import paddingStyles from "@darwin-studio/vue-ui-codegen/dist/styles/padding.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import roundingStyles from "@darwin-studio/vue-ui-codegen/dist/styles/rounding.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import sizeStyles from "@darwin-studio/vue-ui-codegen/dist/styles/size.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import transitionStyles from "@darwin-studio/vue-ui-codegen/dist/styles/transition.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/vue-ui-codegen/config.json";
import useControlId from "@darwin-studio/vue-ui/src/compositions/control-id";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name"; // TODO: fix relative path
import type { TagName } from "@/types/tag-name";
import type { Text } from "@/types/text";
import styles from "./index.module.css";
import config from "./config";

// TODO: mask, number, password ???
// TODO: what about inverse color scheme ???
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Defines value of the <b>value</b> tag.
     */
    value: {
      type: [String, Number] as PropType<Text>,
    },
    // TODO: inputClass
    /**
     * Defines content of the <b>label</b> tag.
     */
    label: {
      type: [String, Number] as PropType<Text>,
    },
    /**
     * TODO: Add description
     */
    labelFont: {
      type: String as PropType<Font>,
      default: FONT.MEDIUM,
    },
    // TODO: labelClass
    // TODO: labelHtml / labelSlot???
    // - or add one props.inputAttrs
    disabled: {
      type: Boolean,
    },
    /**
     * TODO: Add description
     */
    placeholder: {
      type: String,
    },
    // TODO: min / max / ... other common input attrs ???
    /**
     * Defines <i>id</i> attr of the <b>input</b> tag.<br>
     */
    id: {
      type: [String, Number] as PropType<Text>,
    },
    /**
     * TODO: Add description
     */
    // TODO: rename paddingType ???
    padding: {
      type: String as PropType<Padding>,
      default: PADDING.DEFAULT, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * TODO: Add description
     */
    // TODO: fontSize and size separately ???
    size: {
      type: String as PropType<Size>,
      default: SIZE.MEDIUM, // TODO: gent defaults base on actual values, not hardcoded
    },
    // TODO: rename transitionType ???
    transition: {
      type: String as PropType<Transition>,
      default: TRANSITION.FAST, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * TODO: Add description
     */
    // TODO: rename roundingType ???
    rounding: {
      type: String as PropType<Rounding>,
      default: ROUNDING.MEDIUM, // TODO: gent defaults base on actual values, not hardcoded
    },
    // TODO: inputFont ???
    /**
     * TODO: Add description
     */
    inputClass: {
      type: String,
    },
    /**
     * If not empty renders as an error string below the <b>input</b> tag.
     */
    error: {
      type: String,
    },
    /**
     * TODO: Add description
     */
    errorFont: {
      type: String as PropType<Font>,
      default: FONT.MEDIUM,
    },
    // TODO: errorClass
    /**
     * TODO: Add description
     */
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.DIV,
    },
    /**
     * TODO: Add description
     */
    whenChange: {
      type: Function as PropType<(event?: Event) => void | Promise<void>>,
    },
    /**
     * TODO: Add description
     */
    whenInput: {
      type: Function as PropType<(event?: Event) => void | Promise<void>>,
    },
    /**
     * TODO: Add description
     */
    whenSubmit: {
      // TODO: Add value ???
      type: Function as PropType<() => void | Promise<void>>,
    },
  },

  setup(props) {
    // TODO: const { controlId } = useControlId(props);
    return useControlId(props);
  },

  computed: {
    renderLabel(): VNode | null {
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.labelFont
      );

      if (this.label) {
        return (
          <label
            for={this.controlId}
            class={[styles[config.labelClassName], fontStyles[fontClassName]]}
          >
            {this.label}
          </label>
        );
      }

      return null;
    },

    inputClasses(): (string | undefined)[] {
      const colorScheme = "secondary";
      // TODO: border and size and colorScheme separately ???
      const borderClassName = prepareCssClassName(
        codegenConfig.TOKENS.BORDER.CSS_CLASS_PREFIX,
        `${colorScheme}-${this.size}` // TODO: don't use hardcoded values
      );
      // TODO: font and size separately
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.size
      );
      // TODO: outline and size and colorScheme separately ???
      const outlineClassName = prepareCssClassName(
        codegenConfig.TOKENS.OUTLINE.CSS_CLASS_PREFIX,
        `${colorScheme}-${this.size}` // TODO: don't use hardcoded values
      );
      const paddingClassName = prepareCssClassName(
        codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
        this.padding
      );
      const paddingSizeClassName = prepareCssClassName(
        codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
        `${this.padding}-${this.size}`
      );
      const roundingClassName = prepareCssClassName(
        codegenConfig.TOKENS.ROUNDING.CSS_CLASS_PREFIX,
        this.rounding
      );
      const sizeClassName = prepareCssClassName(
        codegenConfig.TOKENS.SIZE.CSS_CLASS_PREFIX,
        this.size
      );
      const transitionClassName = prepareCssClassName(
        codegenConfig.TOKENS.TRANSITION.CSS_CLASS_PREFIX,
        this.transition
      );

      return [
        styles[config.inputClassName],
        borderStyles[borderClassName],
        fontStyles[fontClassName],
        outlineStyles[outlineClassName],
        paddingStyles[paddingSizeClassName],
        paddingStyles[paddingClassName],
        roundingStyles[roundingClassName],
        sizeStyles[sizeClassName],
        transitionStyles[transitionClassName],
        this.inputClass,
      ];
    },

    // TODO: how to do it in a more elegant way
    inputStyles(): Record<string, string> {
      const styles: Record<string, string> = {};
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
          id={this.label || this.id ? this.controlId : undefined}
          value={this.value}
          placeholder={this.placeholder}
          disabled={this.disabled}
          class={this.inputClasses}
          style={this.inputStyles}
          onChange={this.changeHandler} // TODO: why warning ???
          onInput={this.inputHandler} // TODO: why warning ???
          onKeyup={this.keyupHandler}
        />
      );

      if (this.hasSlot) {
        const sizeClassName = prepareCssClassName(
          codegenConfig.TOKENS.SIZE.CSS_CLASS_PREFIX,
          this.size
        );

        return (
          <div class={styles[config.inputContainerClassName]}>
            {this.$slots.before && (
              <div class={[config.beforeContainerClass, sizeClassName]}>
                {this.$slots.before?.()}
              </div>
            )}
            {inputVNode}
            {this.$slots.after && (
              <div class={[config.afterContainerClass, sizeClassName]}>
                {this.$slots.after?.()}
              </div>
            )}
          </div>
        );
      }

      return inputVNode;
    },

    renderError(): VNode | null {
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.errorFont
      );

      if (this.error) {
        /*TODO: should it be a tooltip to avoid layout shift ?*/
        return (
          <div
            class={[styles[config.errorClassName], fontStyles[fontClassName]]}
          >
            {this.error}
          </div>
        );
      }

      return null;
    },
  },

  methods: {
    changeHandler(event: Event) {
      this.$emit("change:value", event);
      this.whenChange?.(event); // TODO: pass plain value ???
    },

    inputHandler(event: Event) {
      this.$emit("input:value", event);
      this.whenInput?.(event); // TODO: pass plain value ???
    },

    keyupHandler(event: KeyboardEvent) {
      if (event.key === "Enter") {
        this.$emit("submit"); // TODO: submit:value ???
        this.whenSubmit?.();
      }
    },
  },

  render(): VNode {
    const Tag = this.tag;

    return (
      <Tag class={styles[config.className]}>
        {this.renderLabel}
        {this.renderInput}
        {this.renderError}
      </Tag>
    );
  },
});
