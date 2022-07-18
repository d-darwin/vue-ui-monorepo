import { defineComponent, PropType, VNode } from "vue";
import type { Rounding } from "@darwin-studio/vue-ui-codegen/dist/types/rounding"; // TODO: shorter path, default export ???
import { ROUNDING } from "@darwin-studio/vue-ui-codegen/dist/constants/rounding"; // TODO: shorter path, default export ???
import type { Size } from "@darwin-studio/vue-ui-codegen/dist/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import useControlId from "@darwin-studio/vue-ui/src/compositions/control-id";
import type { Text } from "@/types/text";
import styles from "./index.module.css";
import config from "./config";

// TODO: mask,
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
    const { controlId } = useControlId(props);
    return { controlId };
  },

  methods: {
    changeHandler(event: Event) {
      this.$emit("change:value", event);
      this.whenChange?.(event);
    },

    inputHandler(event: Event) {
      this.$emit("input:value", event);
      this.whenInput?.(event);

      // TODO: if Enter key -> this.submitHandler
    },

    keyupHandler(event: KeyboardEvent) {
      if (event.key === "Enter") {
        this.$emit("submit");
        this.whenSubmit?.();
      }
    },
  },

  render(): VNode {
    // TODO: label
    // TODO: size
    // TODO: rounding
    // TODO: error (via Tooltip ???)
    // TODO: events on*, when*
    // TODO: slots (befor / after)
    return (
      <div class={styles[config.className]}>
        {this.label && (
          <label for={this.controlId} class={styles[config.labelClassName]}>
            {this.label}
          </label>
        )}
        <input
          id={this.label || this.id ? this.controlId : undefined}
          value={this.value}
          placeholder={this.placeholder}
          disabled={this.disabled}
          class={styles[config.inputClassName]}
          onChange={this.changeHandler}
          onInput={this.inputHandler}
          onKeyup={this.keyupHandler}
        />
      </div>
    );
  },
});
