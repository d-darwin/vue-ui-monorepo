import { defineComponent, PropType, VNode } from "vue";
import type { Rounding } from "@darwin-studio/vue-ui-codegen/dist/types/rounding"; // TODO: shorter path, default export ???
import { ROUNDING } from "@darwin-studio/vue-ui-codegen/dist/constants/rounding"; // TODO: shorter path, default export ???
import type { Size } from "@darwin-studio/vue-ui-codegen/dist/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import type { Transition } from "@darwin-studio/vue-ui-codegen/dist/types/transition"; // TODO: shorter path, default export ???
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition"; // TODO: shorter path, default export ???
import roundingStyles from "@darwin-studio/vue-ui-codegen/dist/styles/rounding.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import sizeStyles from "@darwin-studio/vue-ui-codegen/dist/styles/size.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import transitionStyles from "@darwin-studio/vue-ui-codegen/dist/styles/transition.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/vue-ui-codegen/config.json";
import useControlId from "@darwin-studio/vue-ui/src/compositions/control-id";
import type { Text } from "@/types/text";
import styles from "./index.module.css";
import config from "./config";

// TODO: mask, number, password
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
    // TODO: labelClass
    // TODO: labelFont
    // TODO: labelHtml / labelSlot???
    /**
     * TODO: Add description
     */
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
    // TODO: color scheme ???
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
    // TODO: rename paddingType ???
    /* padding: {
      type: String as PropType<Padding>,
      default: PADDING.DEFAULT, // TODO: gent defaults base on actual values, not hardcoded
    }, */
    /**
     * TODO: Add description
     */
    // TODO: rename roundingType ???
    rounding: {
      type: String as PropType<Rounding>,
      default: ROUNDING.MEDIUM, // TODO: gent defaults base on actual values, not hardcoded
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
    classes(): string[] {
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
        styles[config.className],
        roundingStyles[roundingClassName],
        sizeStyles[sizeClassName],
        transitionStyles[transitionClassName],
      ];
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
          class={styles[config.inputClassName]}
          onChange={this.changeHandler} // TODO: why warning ???
          onInput={this.inputHandler} // TODO: why warning ???
          onKeyup={this.keyupHandler}
        />
      );

      if (this.hasSlot) {
        return (
          <div class={styles[config.inputContainerClassName]}>
            {this.$slots.before?.()}
            {inputVNode}
            {this.$slots.after?.()}
          </div>
        );
      }

      return inputVNode;
    },
  },

  methods: {
    changeHandler(event: Event) {
      this.$emit("change:value", event);
      this.whenChange?.(event);
    },

    inputHandler(event: Event) {
      this.$emit("input:value", event);
      this.whenInput?.(event);
    },

    keyupHandler(event: KeyboardEvent) {
      if (event.key === "Enter") {
        this.$emit("submit"); // TODO: submit:value ???
        this.whenSubmit?.();
      }
    },
  },

  render(): VNode {
    return (
      <div class={this.classes}>
        {/*TODO: move to the getter ?*/}
        {this.label && (
          <label for={this.controlId} class={styles[config.labelClassName]}>
            {this.label}
          </label>
        )}
        {this.renderInput}
        {/*TODO: move to the getter ?*/}
        {/*TODO: should it be a tooltip to avoid layout shift ?*/}
        {this.error && (
          <div class={styles[config.errorClassName]}>{this.error}</div>
        )}
      </div>
    );
  },
});
