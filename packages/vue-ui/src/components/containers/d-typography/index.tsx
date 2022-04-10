import { PropType, defineComponent, VNode } from "vue";
import Content from "@/components/types/content";
import styles from "./index.css?module";

export default defineComponent({
  name: "DTypography",

  props: {
    content: {
      type: [String, Number] as PropType<Content>,
      default: "",
    },
  },

  render(): VNode {
    return <div class={styles.dTypography}>{this.content}</div>;
  },
});
