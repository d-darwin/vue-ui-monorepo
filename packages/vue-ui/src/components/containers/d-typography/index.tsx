import { PropType, defineComponent, VNode, ref } from "vue";
// TODO: get @darwin-studio/vue-ui-codegen paths from config.json
import fontStyles from "@darwin-studio/vue-ui-codegen/dist/styles/font.css"; // TODO: module, common style ???
import type { Font } from "@darwin-studio/vue-ui-codegen/dist/types/font"; // TODO: shorter path, default export ???
import { FONT } from "@darwin-studio/vue-ui-codegen/dist/constants/font"; // TODO: shorter path, default export ???
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName"; // TODO: shorter path ???
import config from "@darwin-studio/vue-ui-codegen/config.json"; // TODO: shorter path, inject to not import ???
import type { Text } from "@/types/text";
import type { TagName } from "@/types/tag-name";
import { TAG_NAME_DEFAULTS } from "../../../constants/tag-name"; // TODO: fix relative path
import styles from "./index.module.css";

/**
 * This is a test.
 */
export default defineComponent({
  name: "DTypography",

  props: {
    /**
     * Simple text string, to pass html consider using default slot or html prop
     */
    text: {
      type: [String, Number] as PropType<Text>,
    },
    // TODO: description
    html: {
      // TODO: warning
      type: String,
    },
    // TODO: description
    font: {
      type: String as PropType<Font>,
      default: FONT.MEDIUM,
    },
    // TODO: description
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.DIV,
    },
  },

  setup(props) {
    const fontClassName = prepareCssClassName(
      config.TOKENS.FONT.CSS_CLASS_PREFIX,
      props.font
    );

    const classes = ref([styles.dTypography, fontStyles[fontClassName]]);

    return { classes };
  },

  render(): VNode {
    const Tag = this.tag;

    if (this.html) {
      return <Tag class={this.classes} v-html={this.html} />;
    }

    console.log("render", this.font);

    return (
      <Tag class={this.classes}>{this.$slots.default?.() || this.text}</Tag>
    );
  },
});
