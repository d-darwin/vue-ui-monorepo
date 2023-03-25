import {
  defineComponent,
  type HTMLAttributes,
  type PropType,
  type VNode,
} from "vue";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
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
     * Plain string or VNode
     */
    content: generateProp.content(),
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
        generateClass.font(this.font),
        generateClass.outline(config.outlineTokenVariantName),
        generateClass.size(this.font),
        generateClass.transition(this.transition),
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
    /** @slot Use instead of props.label to fully customize content */
    return (
      <Tag {...this.bindings}>{this.$slots.default?.() || this.content}</Tag>
    );
  },
});
