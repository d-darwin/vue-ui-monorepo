import { defineComponent, PropType, VNode } from "vue";
import { ColorScheme } from "@darwin-studio/ui-codegen/dist/types/color-scheme";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import config from "./config";
import styles from "./index.css?module";

export default defineComponent({
  name: config.name,

  props: {
    /**
     * Defines appearance of the component
     */
    colorScheme: {
      type: String as PropType<ColorScheme>,
      default: COLOR_SCHEME.PRIMARY, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * TODO
     */
    opacity: {
      type: Number,
      default: config.defaultOpacity,
    },
  },

  methods: {
    clickHandler() {
      // TODO
    },
  },

  render(): VNode {
    // TODO const Tag = this.tag;
    return (
      <div class={styles[config.className]} onClick={this.clickHandler}>
        aaaasdf
      </div>
    );
  },
});
