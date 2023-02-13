import { defineComponent, PropType, VNode } from "vue";
import type { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import config from "./config";
import styles from "./index.css?module";
import "@darwin-studio/ui-codegen/dist/styles/breakpoints.css";

// TODO: descr, naming
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Defines container element type of the component
     */
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.DIV,
    },
  },

  render(): VNode {
    const Tag = this.tag;

    return (
      <Tag class={styles[config.className]}>{this.$slots.default?.()}</Tag>
    );
  },
});
