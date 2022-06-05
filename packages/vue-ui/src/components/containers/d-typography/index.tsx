import { PropType, defineComponent, VNode } from "vue";
import fontStyles from "@darwin-studio/vue-ui-codegen/build/styles/font.css?module"; // TODO: not module, common style ???
import { Size } from "@darwin-studio/vue-ui-codegen/build/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/vue-ui-codegen/build/constants/size"; // TODO: shorter path, default export ???
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName"; // TODO: shorter path ???
import config from "@darwin-studio/vue-ui-codegen/config.json"; // TODO: shorter path ???
import { Text } from "@/types/text";
import { TagName, TAG_NAME_DEFAULTS } from "../../../types/tag-name"; // TODO: fix shorthand

import styles from "./index.css?module";
export default defineComponent({
  name: "DTypography",

  props: {
    text: {
      // TODO: name
      type: [String, Number] as PropType<Text>,
    },
    html: {
      // TODO: name
      // TODO: warning
      type: String,
    },
    size: {
      type: String as PropType<Size>,
      default: SIZE.MEDIUM,
    },
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.DIV,
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
    const Tag = this.tag;

    if (this.html) {
      return <Tag class={this.classes} vHtml={this.html} />;
    }

    return (
      <Tag class={this.classes}>{this.$slots.default?.() || this.text}</Tag>
    );
  },
});
