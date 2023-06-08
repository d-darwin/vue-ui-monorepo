import { defineComponent } from "vue";
import type { CSSProperties, VNode } from "vue";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import { parseWidthHeight } from "./utils";
import config from "./config";

/**
 * The component uses padding-bottom / zero-height hack to simulate aspect-ratio CSS property if it is not supported.
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Aspect ratio of the picture. Expected format: 2 || '0.5' || 'width/height' || 'width:height'.
     */
    aspectRatio: generateProp.text(config.aspectRatio),
    /**
     * Plain string or VNode
     */
    content: generateProp.content(),
    /**
     * Defines container element type of the component
     */
    tag: generateProp.tag(),
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
        class: config.class,
        style: this.wrapperStyle,
      };

      return (
        <Tag {...wrapperBindings}>
          {this.$slots.default?.() || this.content}
        </Tag>
      );
    },

    renderHack(): VNode {
      const Tag = this.tag;
      const innerBindings = {
        class: config.innerClass,
        style: this.innerStyle,
      };

      return (
        <Tag class={config.class}>
          <div {...innerBindings}>
            {this.$slots.default?.() || this.content}
          </div>
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
