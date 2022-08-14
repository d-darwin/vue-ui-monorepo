import {
  defineComponent,
  VNode,
  PropType,
  InputHTMLAttributes,
  ref,
} from "vue";
import type { ColorScheme } from "@darwin-studio/vue-ui-codegen/dist/types/color-scheme"; // TODO: shorter path, default export ???
import { COLOR_SCHEME } from "@darwin-studio/vue-ui-codegen/dist/constants/color-scheme"; // TODO: shorter path, default export ???
import type { Font } from "@darwin-studio/vue-ui-codegen/dist/types/font"; // TODO: shorter path, default export ???
// import { FONT } from "@darwin-studio/vue-ui-codegen/dist/constants/font"; // TODO: shorter path, default export ???
import { PADDING } from "@darwin-studio/vue-ui-codegen/dist/constants/padding"; // TODO: shorter path, default export ???
import type { Rounding } from "@darwin-studio/vue-ui-codegen/dist/types/rounding"; // TODO: shorter path, default export ???
import { ROUNDING } from "@darwin-studio/vue-ui-codegen/dist/constants/rounding"; // TODO: shorter path, default export ???
import type { Size } from "@darwin-studio/vue-ui-codegen/dist/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import type { Transition } from "@darwin-studio/vue-ui-codegen/dist/types/transition"; // TODO: shorter path, default export ???
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition"; // TODO: shorter path, default export ???
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name"; // TODO: fix relative path
import borderStyles from "@darwin-studio/vue-ui-codegen/dist/styles/border.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import colorSchemeStyles from "@darwin-studio/vue-ui-codegen/dist/styles/color-scheme.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import fontStyles from "@darwin-studio/vue-ui-codegen/dist/styles/font.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import outlineStyles from "@darwin-studio/vue-ui-codegen/dist/styles/outline.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import paddingStyles from "@darwin-studio/vue-ui-codegen/dist/styles/padding.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import roundingStyles from "@darwin-studio/vue-ui-codegen/dist/styles/rounding.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import sizeStyles from "@darwin-studio/vue-ui-codegen/dist/styles/size.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import transitionStyles from "@darwin-studio/vue-ui-codegen/dist/styles/transition.css"; // TODO: shorter path, default export ??? TODO: make it module ???
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
      default: COLOR_SCHEME.SECONDARY, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * TODO: Add description
     */
    // TODO: rename roundingType ???
    rounding: {
      type: String as PropType<Rounding>,
      default: ROUNDING.MEDIUM, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * TODO: Add description
     */
    // TODO: fontSize and size separately ???
    size: {
      type: String as PropType<Size>,
      default: SIZE.TINY, // TODO: gent defaults base on actual values, not hardcoded
    },
    // TODO: rename transitionType ???
    transition: {
      type: String as PropType<Transition>,
      default: TRANSITION.FAST, // TODO: gent defaults base on actual values, not hardcoded
    },
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
      // default: FONT.MEDIUM,
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
      // default: FONT.MEDIUM,
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
    const innerChecked = ref(props.checked);
    const { controlId } = useControlId(props);
    return { innerChecked, controlId };
  },

  computed: {
    renderIcon(): VNode[] {
      // TODO: border and size and colorScheme separately ???
      const borderClassName = prepareCssClassName(
        codegenConfig.TOKENS.BORDER.CSS_CLASS_PREFIX,
        `${BASE_COLOR_SCHEME}-${this.size}`
      );
      const colorSchemeClassName = prepareCssClassName(
        codegenConfig.TOKENS.COLOR_SCHEME.CSS_CLASS_PREFIX,
        this.colorScheme
      );
      const paddingSizeClassName = prepareCssClassName(
        codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
        `${PADDING.EQUAL}-${this.size}` //TODO: avoid hardcode
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

      const iconContainerStyles = [
        styles[config.iconContainerClassName],
        borderStyles[borderClassName],
        colorSchemeStyles[colorSchemeClassName],
        paddingStyles[paddingSizeClassName],
        roundingStyles[roundingClassName],
        sizeStyles[sizeClassName],
        transitionStyles[transitionClassName],
      ];
      if (this.disabled) {
        iconContainerStyles.push(colorSchemeStyles.__disabled);
      }

      // TODO: try not to use backdrop at all
      return [
        <div
          class={[
            styles[config.iconContainerBackdropClassName],
            sizeStyles[sizeClassName],
          ]}
        />,
        <div class={iconContainerStyles}>
          <div
            class={{
              [styles[config.iconClassName]]: true,
              [transitionStyles[transitionClassName]]: true,
              [styles.__hidden]: !this.innerChecked,
            }}
          >
            {config.checkMark}
          </div>
        </div>,
      ];
    },

    renderInput(): VNode {
      // TODO: outline and size and colorScheme separately ???
      const outlineClassName = prepareCssClassName(
        codegenConfig.TOKENS.OUTLINE.CSS_CLASS_PREFIX,
        `${BASE_COLOR_SCHEME}-${this.size}`
      );
      const sizeClassName = prepareCssClassName(
        codegenConfig.TOKENS.SIZE.CSS_CLASS_PREFIX,
        this.size
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
            sizeStyles[sizeClassName],
            this.inputClass,
          ]}
          onChange={this.changeHandler}
          // TODO: onInput ???
        />
      );
    },

    renderLabelContent(): VNode | null {
      if (this.$slots.label?.() || this.label) {
        return (
          <div class={styles[config.labelInnerClassName]}>
            {this.$slots.label?.() || this.label}
          </div>
        );
      }

      if (this.labelHtml) {
        return (
          <div
            class={styles[config.labelInnerClassName]}
            v-html={this.labelHtml}
          />
        );
      }

      return null;
    },

    // TODO: make composition / util ???
    renderLabel(): VNode {
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.labelFont || this.size
      );

      const labelClasses = [
        styles[config.labelClassName],
        fontStyles[fontClassName],
        this.labelClass,
      ];
      if (this.disabled) {
        labelClasses.push(styles.__disabled);
      }

      return (
        <label for={this.controlId} class={labelClasses}>
          {this.renderInput}
          {this.renderIcon}
          {this.renderLabelContent}
        </label>
      );
    },

    // TODO: make composition / util ???
    // TODO: control-notification component: error (danger?) | warning  | notice(info?)| success
    renderError(): VNode | null {
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.errorFont || this.size
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

      this.innerChecked = checked;
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
        {this.renderLabel}
        {/*TODO: transition*/}
        {this.renderError}
      </Tag>
    );
  },
});
