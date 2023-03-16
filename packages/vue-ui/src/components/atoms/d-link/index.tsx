import {
  defineComponent,
  type HTMLAttributes,
  type PropType,
  type VNode,
} from "vue";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import getCommonCssClass from "@darwin-studio/vue-ui/src/utils/get-common-css-class";
import { TOKEN_NAME } from "@darwin-studio/vue-ui/src/constants/token-name";
import type { Tag } from "./types";
import config from "./config";
import styles from "./index.css?module";

/**
 * Renders as a <b>router-link</b> or just as an <b>a</b> element depending on props.
 */
export default defineComponent({
  name: config.name,

  // TODO: add props factory ???
  props: {
    /**
     * Plain string, VNode or HTML if props.enableHtml is true
     */
    label: generateProp.content(),
    /**
     * Defines font size of the component. By default, depends on props.size
     */
    font: generateProp.font(),
    /**
     * Defines transition type of the component
     */
    transition: generateProp.transition(),
    /**
     * Pass true to disable click events.
     */
    disabled: Boolean,
    /**
     * Pass true to prevent default click behaviour
     */
    preventDefault: Boolean,
    /**
     * Enables html string rendering passed in props.label.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    // TODO: remove
    enableHtml: Boolean,

    /**
     * Alternative way to catch click event
     */
    whenClick: {
      type: Function as PropType<(event?: MouseEvent) => void | Promise<void>>,
    },
  },

  emits: [EVENT_NAME.CLICK],

  // TODO: move to setup() ???
  computed: {
    classes(): (string | undefined)[] {
      const classes = [
        styles[config.className],
        getCommonCssClass(TOKEN_NAME.FONT, this.font),
        getCommonCssClass(TOKEN_NAME.OUTLINE, config.outlineTokenVariantName),
        getCommonCssClass(TOKEN_NAME.SIZE, this.font),
        getCommonCssClass(TOKEN_NAME.TRANSITION, this.transition),
      ];

      if (this.disabled) {
        classes.push(styles["__disabled"]);
      }

      return classes;
    },

    tag(): Tag {
      // TODO: config or const
      if (this.$attrs["to"]) {
        return config.routerLinkTag;
      }

      return config.linkTag;
    },

    bindings(): HTMLAttributes {
      return {
        class: this.classes,
        onClick: this.clickHandler,
      };
    },
  },

  methods: {
    clickHandler(event: MouseEvent): void | Promise<void> {
      if (this.preventDefault) {
        event.preventDefault();
      }

      if (!this.disabled) {
        /**
         * Emits on click with MouseEvent payload
         * @event click
         * @type {event: MouseEvent}
         */
        this.$emit("click", event);
        this.whenClick?.(event);
      }
    },
  },

  render(): VNode {
    const Tag = this.tag;

    if (!this.enableHtml) {
      /** @slot Use instead of props.label to fully customize content */
      return (
        <Tag {...this.bindings}>{this.$slots.default?.() || this.label}</Tag>
      );
    }

    return <Tag {...this.bindings} v-html={this.label} />;
  },
});
