import { CSSProperties, defineComponent, PropType, VNode } from "vue";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name"; // TODO: fix relative path
import aspectRationValidator from "@darwin-studio/vue-ui/src/utils/aspect-ration-validator"; // TODO: fix relative path
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import type { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import { parseWidthHeight } from "./utils";
import config from "./config";
import styles from "./index.css?module";

/**
 * The component uses padding-bottom / zero-height hack to simulate aspect-ratio CSS property if it is not supported.
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Aspect ratio of the picture. Expected format: 2 || '0.5' || 'width/height' || 'width:height'.
     */
    aspectRatio: {
      type: [String, Number] as PropType<Text>,
      default: "1",
      validator: aspectRationValidator, // TODO: do we need this extra calculations ??
    },
    /**
     * Plain string, VNode or HTML if props.enableHtml is true
     */
    content: {
      type: [String, Number, Object] as PropType<Text | VNode>,
    },
    /**
     * Defines container element type of the component
     */
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.DIV,
    },
    /**
     * Enables html string rendering passed in props.label and props.error.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    enableHtml: {
      type: Boolean,
    },
  },

  computed: {
    size(): { width: number; height: number } {
      let width = 1;
      let height = 1;
      const aspectRatio = String(this.aspectRatio);

      config.separatorList.some((separator) => {
        [width, height] = parseWidthHeight(this.aspectRatio, separator);
        return aspectRatio.includes(separator);
      });

      return { width, height };
    },

    formattedAspectRatio(): string {
      if (!isNaN(Number(this.aspectRatio))) {
        return String(this.aspectRatio || 1);
      }

      const { width, height } = this.size;

      return `${width} / ${height}`;
    },

    paddingBottom(): string {
      let paddingBottom = null;
      if (!isNaN(Number(this.aspectRatio))) {
        return `${100 / Number(this.aspectRatio || 1)}%`;
      }

      const { width, height } = this.size;
      paddingBottom = `${(100 * height) / width}%`;

      return paddingBottom;
    },

    hasAspectRationNativeSupport(): boolean {
      return CSS?.supports("aspect-ratio: auto") || false;
    },

    wrapperStyle(): CSSProperties {
      return {
        "aspect-ratio": this.formattedAspectRatio,
      };
    },

    innerStyle(): CSSProperties {
      return { "padding-bottom": this.paddingBottom };
    },

    renderNative(): VNode {
      const Tag = this.tag;
      const wrapperBindings = {
        class: styles[config.className],
        style: this.wrapperStyle,
      };

      if (!this.enableHtml) {
        return (
          <Tag {...wrapperBindings}>
            {this.$slots.default?.() || this.content}
          </Tag>
        );
      }

      return <Tag {...wrapperBindings} v-html={this.content} />;
    },

    renderHack(): VNode {
      const Tag = this.tag;
      const innerBindings = {
        class: styles[config.innerClassName],
        style: this.innerStyle,
      };

      if (!this.enableHtml) {
        return (
          <Tag class={styles[config.className]}>
            <div {...innerBindings}>
              {this.$slots.default?.() || this.content}
            </div>
          </Tag>
        );
      }

      return (
        <Tag class={styles[config.className]}>
          <div {...innerBindings} v-html={this.content} />
        </Tag>
      );
    },
  },

  render(): VNode {
    if (this.hasAspectRationNativeSupport) {
      return this.renderNative;
    }

    return this.renderHack;
  },
});
