import { PropType, defineComponent, VNode } from "vue";
import fontStyles from "@darwin-studio/vue-ui-codegen/build/styles/font.css?module"; // TODO: not module, common style ???
import { Size } from "@darwin-studio/vue-ui-codegen/build/types/size";
import { SIZE } from "@darwin-studio/vue-ui-codegen/build/constants/size";
import Content from "@/components/types/content";
import styles from "./index.css?module";

export default defineComponent({
  name: "DTypography",

  props: {
    content: {
      type: [String, Number] as PropType<Content>,
      default: "",
    },
    // TODO: use font size
    size: {
      type: String as PropType<Size>,
      default: SIZE.MEDIUM,
    },
  },

  render(): VNode {
    return (
      <div class={[styles.dTypography, fontStyles.fontTiny]}>
        {this.content}*{this.size}
      </div>
    );
  },
});
