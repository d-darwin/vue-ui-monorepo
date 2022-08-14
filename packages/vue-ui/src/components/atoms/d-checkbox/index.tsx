import { defineComponent, VNode, PropType, InputHTMLAttributes } from "vue";
import type { ColorScheme } from "@darwin-studio/vue-ui-codegen/dist/types/color-scheme"; // TODO: shorter path, default export ???
import { COLOR_SCHEME } from "@darwin-studio/vue-ui-codegen/dist/constants/color-scheme"; // TODO: shorter path, default export ???
import type { Size } from "@darwin-studio/vue-ui-codegen/dist/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import type { Transition } from "@darwin-studio/vue-ui-codegen/dist/types/transition"; // TODO: shorter path, default export ???
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition"; // TODO: shorter path, default export ???
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name"; // TODO: fix relative path
import minControlWidthStyles from "@darwin-studio/vue-ui-codegen/dist/styles/min-control-width.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/vue-ui-codegen/config.json";
import useControlId from "@darwin-studio/vue-ui/src/compositions/control-id";
import type { Text } from "@/types/text";
import type { TagName } from "@/types/tag-name";
import styles from "./index.module.css";
import config from "./config";

// TODO: optional state (only for group)
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Defines content of the <b>label</b> tag.
     */
    label: {
      type: [String, Number] as PropType<Text>,
    },
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
    // TODO: labelClass
    // TODO: enableHtml :arrow_down:
    /**
     * If not empty renders as an error string below the <b>input</b> tag.
     */
    // TODO: errorClass
    // TODO: enableHtml :arrow_up:
    error: {
      type: [String, Number] as PropType<Text>,
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
      return (
        <input
          type="checkbox"
          checked={this.checked}
          value={this.value}
          id={this.controlId}
          disabled={this.disabled}
          {...this.inputAttrs}
          class={[styles[config.inputClassName], this.inputClass]}
          onChange={this.changeHandler}
          // TODO: onInput
        />
      );
    },

    renderLabel(): VNode | null {
      if (!this.label) {
        return null;
      }

      return (
        <label for={this.controlId} class={styles[config.labelClassName]}>
          {this.label}
        </label>
      );
    },
  },

  methods: {
    changeHandler(event: Event): void {
      const checked = (event.target as HTMLInputElement).checked;
      const value = (event.target as HTMLInputElement).value;

      this.$emit("change", checked, value);
      this.$emit("update:checked", checked);
      this.$emit("update:value", checked ? value : undefined);
      this.whenChange?.(checked, value);
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
      </Tag>
    );
  },
});
