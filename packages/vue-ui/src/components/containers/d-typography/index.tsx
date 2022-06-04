import { PropType, defineComponent, VNode } from "vue";
import fontStyles from "@darwin-studio/vue-ui-codegen/build/styles/font.css?module"; // TODO: not module, common style ???
import { Size } from "@darwin-studio/vue-ui-codegen/build/types/size"; // TODO: shorter path ???
import { SIZE } from "@darwin-studio/vue-ui-codegen/build/constants/size"; // TODO: shorter path ???
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName"; // TODO: shorter path ???
import config from "@darwin-studio/vue-ui-codegen/config.json"; // TODO: shorter path ???
import Content from "@/types/content";
import styles from "./index.css?module";

export default defineComponent({
  name: "DTypography",

  props: {
    content: {
      type: [String, Number] as PropType<Content>,
      default: "",
    },
    size: {
      type: String as PropType<Size>,
      default: SIZE.MEDIUM,
    },
  },

  computed: {
    classes(): string[] {
      const fontClassName = prepareCssClassName(
        config.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.size
      );
      return [styles.dTypography, fontStyles[fontClassName]];
    },
  },

  render(): VNode {
    return (
      <div class={this.classes}>{this.$slots.default?.() || this.content}</div>
    );
  },
});
