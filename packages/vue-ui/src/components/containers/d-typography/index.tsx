import { PropType, defineComponent, VNode } from "vue";
import fontStyles from "@darwin-studio/vue-ui-codegen/build/styles/font.css?module"; // TODO: not module, common style ???
import { Size } from "@darwin-studio/vue-ui-codegen/build/types/size"; // TODO: @vue-ui-types ???
import { SIZE } from "@darwin-studio/vue-ui-codegen/build/constants/size"; // TODO: @vue-ui-constants ???
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName"; // TODO: @vue-ui-utils ???
import config from "@darwin-studio/vue-ui-codegen/config.json"; // TODO: @vue-ui-config ???
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
      required: true, // TODO: do we need it ??
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
      <div class={this.classes}>
        {this.content}
        {/* // TODO: slot*/}
      </div>
    );
  },
});
