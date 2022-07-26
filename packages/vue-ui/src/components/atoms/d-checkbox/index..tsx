import { defineComponent, VNode, PropType } from "vue";
import type { ColorScheme } from "@darwin-studio/vue-ui-codegen/dist/types/color-scheme"; // TODO: shorter path, default export ???
import { COLOR_SCHEME } from "@darwin-studio/vue-ui-codegen/dist/constants/color-scheme"; // TODO: shorter path, default export ???
import type { Size } from "@darwin-studio/vue-ui-codegen/dist/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import type { Transition } from "@darwin-studio/vue-ui-codegen/dist/types/transition"; // TODO: shorter path, default export ???
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition"; // TODO: shorter path, default export ???
import type { Text } from "@/types/text";
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
    // TODO: value ???
    /**
     * TODO: Add description
     */
    colorScheme: {
      type: String as PropType<ColorScheme>,
      default: COLOR_SCHEME.PRIMARY, // TODO: gent defaults base on actual values, not hardcoded
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
    // TODO: rounding ???
    /**
     * Defines <i>id</i> attr of the <b>input</b> tag.<br>
     * If you don't want to specify it, it will be generated automatically.
     */
    id: {
      type: [String, Number] as PropType<Text>,
    },
    // TODO: labelClass
    // TODO: enableHtml :arrow_down:
    /**
     * If not empty renders as an error string below the <b>input</b> tag.
     */
    error: {
      type: [String, Number] as PropType<Text>,
    },
    // TODO: errorClass
    // TODO: enableHtml :arrow_up:
    whenChange: {
      type: Function as PropType<
        (value: boolean | Text) => void | Promise<void>
      >,
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
  },

  render(): VNode {
    return <div class={styles[config.className]}>DInput</div>;
  },
});
