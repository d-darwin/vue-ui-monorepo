import { defineComponent, ref, Teleport, Transition as Trans } from "vue";
import type { CSSProperties, HTMLAttributes, PropType, VNode } from "vue";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding"; // TODO: shorter path, default export ???
import { POSITION } from "@darwin-studio/vue-ui/src/constants/position";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import type { Position } from "@darwin-studio/vue-ui/src/types/position";
import type { TransitionBindings } from "@darwin-studio/vue-ui/src/types/transition-bindings";
import prepareHtmlSize from "@darwin-studio/vue-ui/src/utils/prepare-html-size";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
import type { Type } from "./types";
import { TYPE } from "./constants";
import config from "./config";
import styles from "./index.css?module";

/**
 * The component renders text notification (alert) for a given duration.
 */
export default defineComponent({
  name: config.name,

  props: {
    // TODO: isShown ???
    /**
     * Plain string or VNode
     */
    content: generateProp.content(),
    /**
     * Positions on the component.
     * Takes values: 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left'.
     */
    // TODO: placement ???
    position: generateProp.string<Position>(POSITION.TOP_RIGHT),
    /**
     * Min width of the component.
     */
    minWidth: generateProp.text(),
    /**
     * Max width of the component.
     */
    maxWidth: generateProp.text(),
    /**
     * Min height of the component.
     */
    minHeight: generateProp.text(),
    /**
     * Max height of the component.
     */
    maxHeight: generateProp.text(),
    /**
     * If close button shown.
     */
    closable: generateProp.boolean(true),
    /**
     * Defines how long the notification will be displayed.
     */
    duration: generateProp.number(config.duration),
    /**
     * You can pass own class name to the <b>notification</b> element.
     */
    notificationClass: String,
    /**
     * The component is mounted inside passed element.
     */
    target: generateProp.teleportTarget(config.defaultTarget),
    /**
     * The notification type: success, info, warning, error.
     */
    type: generateProp.string<Type>(TYPE.INFO),
    /**
     * Defines font size of the component. By default, depends on props.size
     */
    font: generateProp.font(),
    /**
     * Defines appearance of the component
     */
    colorScheme: generateProp.colorScheme(),
    /**
     * Defines padding type of the component, use 'equal' if the component contains only an icon
     */
    padding: generateProp.padding(),
    /**
     * Defines corner rounding of the component
     */
    rounding: generateProp.rounding(ROUNDING.SMALL),
    /**
     * Defines size of the component
     */
    // TODO: fontSize and size separately ???
    size: generateProp.size(),
    /**
     * Defines transition type of the component
     */
    transition: generateProp.transition(),
    /**
     * Defines container element type of the component
     */
    tag: generateProp.tag(),
    /**
     * Pass props.disable to the <teleport />, so the component will not be moved to the props.target.
     */
    enableInline: Boolean,

    /**
     * Alternative way to catch close event
     */
    whenClose: {
      type: Function as PropType<() => void | Promise<void>>,
    },
  },

  emits: [EVENT_NAME.CLOSE],

  setup() {
    const shown = ref(false as boolean);
    const isContentShown = ref(false as boolean);
    const timeoutId = ref(undefined as number | undefined);

    return { shown, isContentShown, timeoutId };
  },

  mounted() {
    this.show();
    // TODO: watch on content and $slots.content ???
  },

  beforeUnmount() {
    clearTimeout(this.timeoutId);
  },

  computed: {
    classes(): (string | undefined)[] {
      return [
        this.notificationClass,
        styles[config.className],
        styles[this.position],
        styles[this.type],
        generateClass.colorScheme(this.colorScheme),
        generateClass.font(this.font),
        ...generateClass.padding(this.padding, this.size),
        generateClass.rounding(this.rounding),
        generateClass.size(this.size),
        generateClass.transition(this.transition),
      ];
    },

    styles(): CSSProperties {
      const styles: CSSProperties = {};

      // TODO: use css custom props
      if (typeof this.minWidth !== "undefined") {
        styles.minWidth = prepareHtmlSize(this.minWidth);
      }
      if (typeof this.maxWidth !== "undefined") {
        styles.maxWidth = prepareHtmlSize(this.maxWidth);
      }
      if (typeof this.minHeight !== "undefined") {
        styles.minHeight = prepareHtmlSize(this.minHeight);
      }
      if (typeof this.maxHeight !== "undefined") {
        styles.maxHeight = prepareHtmlSize(this.maxHeight);
      }

      return styles;
    },

    bindings(): HTMLAttributes {
      return {
        role: config.role,
        class: this.classes,
        style: this.styles,
        onClick: this.closeHandler,
      };
    },

    transitionBindings(): TransitionBindings {
      return {
        enterActiveClass: styles.transitionEnterActive,
        leaveActiveClass: styles.transitionLeaveActive,
      };
    },
  },

  methods: {
    show(): void {
      this.shown = true;

      this.$nextTick(() => {
        this.isContentShown = true;
      });

      if (!this.duration) {
        return;
      }

      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.closeHandler();
      }, this.duration * 1000);
    },

    closeHandler(): void {
      if (!this.closable) {
        return;
      }
      this.shown = false;
      /**
       * Emits on the component close
       * @event close
       */
      this.$emit(EVENT_NAME.CLOSE);
      this.whenClose?.();
      clearTimeout(this.timeoutId);
    },
  },

  /*TODO: why vue-docgen cant' detect not default slots ???*/
  /** @slot $slots.default
   *  Use instead of props.content to fully customize content
   */
  render(): VNode {
    const Tag = this.tag;
    return (
      <Teleport to={this.target} disabled={Boolean(this.enableInline)}>
        <Trans {...this.transitionBindings}>
          {this.shown && (
            <Tag {...this.bindings}>
              {this.isContentShown && (this.$slots.default?.() || this.content)}
            </Tag>
          )}
        </Trans>
      </Teleport>
    );
  },
});
