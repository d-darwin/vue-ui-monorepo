import { defineComponent, PropType, VNode } from "vue";
import { ColorScheme } from "@darwin-studio/ui-codegen/dist/types/color-scheme";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import type { CssPosition } from "./types";
import config from "./config";
import styles from "./index.css?module";

/**
 * The component renders simple backdrop, intended to be used with Drawers, Modals, etc.
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Defines appearance of the component
     */
    colorScheme: {
      type: String as PropType<ColorScheme>,
      default: COLOR_SCHEME.PRIMARY, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines opacity of the component
     */
    opacity: {
      type: Number,
      default: config.defaultOpacity,
    },
    /**
     * Defines z-index attr of the component
     */
    zIndex: {
      type: Number,
      default: config.defaultZIndex,
    },
    /**
     * Defines position attr of the component
     */
    position: {
      type: String as PropType<CssPosition>,
      default: config.defaultPosition,
    },
    /**
     * Defines container element type of the component
     */
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.DIV,
    },

    /**
     * Alternative way to catch click event
     */
    whenClick: {
      type: Function as PropType<(event?: MouseEvent) => void | Promise<void>>,
    },
  },

  emits: [EVENT_NAME.CLICK],

  computed: {
    bindings(): Record<
      string,
      string | Record<string, number | string> | (() => void)
    > {
      return {
        class: styles[config.className],
        style: {
          "--background-color": `var(--color-${this.colorScheme}-background)`,
          "--opacity": this.opacity,
          "--z-index": this.zIndex,
          "--position": this.position,
        },
        onClick: this.clickHandler,
      };
    },
  },

  methods: {
    clickHandler() {
      /**
       * Just emits click event without any payload.
       *
       * @event click
       * @type {undefined}
       */
      this.$emit(EVENT_NAME.CLICK);
      this.whenClick?.();
    },
  },

  render(): VNode {
    const Tag = this.tag;

    return <Tag {...this.bindings} />;
  },
});
