import { PropType, defineComponent, VNode } from "vue";
// TODO: get @darwin-studio/vue-ui-codegen paths from config.json
import fontStyles from "@darwin-studio/vue-ui-codegen/build/styles/font.css"; // TODO: module, common style ???
import type { Size } from "@darwin-studio/vue-ui-codegen/build/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/vue-ui-codegen/build/constants/size"; // TODO: shorter path, default export ???
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName"; // TODO: shorter path ???
import config from "@darwin-studio/vue-ui-codegen/config.json"; // TODO: shorter path, inject to not import ???
import type { Text } from "@/types/text";
import type { TagName } from "@/types/tag-name";
import { TAG_NAME_DEFAULTS } from "../../../constants/tag-name"; // TODO: fix relative path
import styles from "./index.module.css";

export default defineComponent({
  name: "DTypography",

  props: {
    text: {
      type: [String, Number] as PropType<Text>,
    },
    html: {
      // TODO: warning
      type: String,
    },
    // TODO: use fontSize const ???
    size: {
      type: String as PropType<Size>,
      default: SIZE.MEDIUM,
    },
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.DIV,
    },
  },

  // TODO: move to setup()
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
    const Tag = this.tag;

    if (this.html) {
      return <Tag class={this.classes} v-html={this.html} />;
    }

    return (
      <Tag class={this.classes}>{this.$slots.default?.() || this.text}</Tag>
    );
  },
});
