import {
  defineComponent,
  PropType,
  VNode,
  Teleport,
  Transition as Trans,
  CSSProperties,
  ref,
} from "vue";
import { RendererElement } from "@vue/runtime-core";
import fontStyles from "@darwin-studio/ui-codegen/dist/styles/font.css?module"; // TODO: module, common style ???
import type { Font } from "@darwin-studio/ui-codegen/dist/types/font"; // TODO: shorter path, default export ???
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font"; // TODO: shorter path, default export ???
import type { ColorScheme } from "@darwin-studio/ui-codegen/dist/types/color-scheme"; // TODO: shorter path, default export ???
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme"; // TODO: shorter path, default export ???
import type { Padding } from "@darwin-studio/ui-codegen/dist/types/padding"; // TODO: shorter path, default export ???
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding"; // TODO: shorter path, default export ???
import type { Rounding } from "@darwin-studio/ui-codegen/dist/types/rounding"; // TODO: shorter path, default export ???
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding"; // TODO: shorter path, default export ???
import type { Size } from "@darwin-studio/ui-codegen/dist/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import type { Transition } from "@darwin-studio/ui-codegen/dist/types/transition"; // TODO: shorter path, default export ???
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition"; // TODO: shorter path, default export ???
import colorSchemeStyles from "@darwin-studio/ui-codegen/dist/styles/color-scheme.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import paddingStyles from "@darwin-studio/ui-codegen/dist/styles/padding.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import roundingStyles from "@darwin-studio/ui-codegen/dist/styles/rounding.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import transitionStyles from "@darwin-studio/ui-codegen/dist/styles/transition.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import sizeStyles from "@darwin-studio/ui-codegen/dist/styles/size.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import type { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import type { Position } from "@darwin-studio/vue-ui/src/types/position";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name"; // TODO: fix relative path
import { POSITION } from "@darwin-studio/vue-ui/src/constants/position";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import { prepareSize } from "./utils";
import { Type } from "./types";
import { TYPE } from "./constants";
import config from "./config";
import styles from "./index.css?module";

/**
 * The component renders text notification (alert) for a given duration.
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Plain string, VNode or HTML if props.enableHtml is true
     */
    content: {
      // TODO: array of messages ???
      type: [String, Number, Object] as PropType<Text | VNode>,
    },
    /**
     * Positions on the component.
     * Takes values: 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left'.
     */
    position: {
      type: String as PropType<Position>,
      default: POSITION.TOP_RIGHT,
      validator: (val: Position) =>
        Boolean(Object.values(POSITION).includes(val)),
    },
    /**
     * Min width of the component.
     */
    minWidth: {
      type: [String, Number],
    },
    /**
     * Max width of the component.
     */
    maxWidth: {
      type: [String, Number],
    },
    /**
     * Min height of the component.
     */
    minHeight: {
      type: [String, Number],
    },
    /**
     * Max height of the component.
     */
    maxHeight: {
      type: [String, Number],
    },
    /**
     * If close button shown.
     */
    closable: {
      // TODO: dont use hover classes
      type: Boolean,
      default: true,
    },
    /**
     * Defines how long the notification will be displayed.
     */
    duration: {
      type: Number,
      default: config.duration,
    },
    /**
     * You can pass own class name to the <b>notification</b> element.
     */
    notificationClass: {
      type: String,
    },
    /**
     * The component is mounted inside passed element.
     */
    target: {
      type: [String, Object] as PropType<string | RendererElement>,
      default: config.defaultTarget,
    },
    /**
     * The notification type: success, info, warning, error.
     */
    type: {
      type: String as PropType<Type>,
      default: TYPE.INFO,
    },
    /**
     * Defines font size of the component. By default, depends on props.size
     */
    font: {
      type: String as PropType<Font>,
      default: FONT.MEDIUM,
    },
    /**
     * Defines appearance of the component
     */
    colorScheme: {
      // TODO: other colors ???
      type: String as PropType<ColorScheme>,
      default: COLOR_SCHEME.PRIMARY, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines padding type of the component, use 'equal' if the component contains only an icon
     */
    padding: {
      type: String as PropType<Padding>,
      default: PADDING.DEFAULT, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines corner rounding of the component
     */
    rounding: {
      type: String as PropType<Rounding>,
      default: ROUNDING.SMALL, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines size of the component
     */
    // TODO: fontSize and size separately ???
    size: {
      type: String as PropType<Size>,
      default: SIZE.MEDIUM, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines transition type of the component
     */
    transition: {
      type: String as PropType<Transition>,
      default: TRANSITION.FAST, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines container element type of the component
     */
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.DIV,
    },
    /**
     * Enables html string rendering passed in props.content.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    enableHtml: {
      type: Boolean,
    },

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
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.font
      );
      const colorSchemeClassName = prepareCssClassName(
        codegenConfig.TOKENS.COLOR_SCHEME.CSS_CLASS_PREFIX,
        this.colorScheme
      );
      const paddingClassName = prepareCssClassName(
        codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
        this.padding
      );
      const paddingSizeClassName = prepareCssClassName(
        codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
        `${this.padding}-${this.size}`
      );
      const roundingClassName = prepareCssClassName(
        codegenConfig.TOKENS.ROUNDING.CSS_CLASS_PREFIX,
        this.rounding
      );
      const sizeClassName = prepareCssClassName(
        codegenConfig.TOKENS.SIZE.CSS_CLASS_PREFIX,
        this.size
      );
      const transitionClassName = prepareCssClassName(
        codegenConfig.TOKENS.TRANSITION.CSS_CLASS_PREFIX,
        this.transition
      );

      return [
        this.notificationClass,
        styles[config.className],
        styles[this.position],
        styles[this.type],
        colorSchemeStyles[colorSchemeClassName],
        fontStyles[fontClassName],
        paddingStyles[paddingSizeClassName],
        paddingStyles[paddingClassName],
        roundingStyles[roundingClassName],
        sizeStyles[sizeClassName],
        transitionStyles[transitionClassName],
      ];
    },

    styles(): CSSProperties {
      const styles: CSSProperties = {};

      if (typeof this.minWidth !== "undefined") {
        styles.minWidth = prepareSize(this.minWidth);
      }
      if (typeof this.maxWidth !== "undefined") {
        styles.maxWidth = prepareSize(this.maxWidth);
      }
      if (typeof this.minHeight !== "undefined") {
        styles.minHeight = prepareSize(this.minHeight);
      }
      if (typeof this.maxHeight !== "undefined") {
        styles.maxHeight = prepareSize(this.maxHeight);
      }

      return styles;
    },

    bindings(): Record<
      string,
      | string
      | (string | undefined)[]
      | CSSProperties
      | ((event: MouseEvent) => void | Promise<void>)
    > {
      return {
        role: config.role,
        class: this.classes,
        style: this.styles,
        onClick: this.close,
      };
    },

    transitionBindings(): {
      enterActiveClass: string;
      leaveActiveClass: string;
    } {
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
        this.close();
      }, this.duration * 1000);
    },

    close(): void {
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

    if (!this.enableHtml) {
      return (
        <Teleport to={this.target} disabled={Boolean(this.$attrs.disabled)}>
          <Trans {...this.transitionBindings}>
            {this.shown && (
              <Tag {...this.bindings}>
                {this.isContentShown
                  ? this.$slots.default?.() || this.content
                  : ""}
              </Tag>
            )}
          </Trans>
        </Teleport>
      );
    }

    return (
      <Teleport to={this.target} disabled={Boolean(this.$attrs.disabled)}>
        <Trans {...this.transitionBindings}>
          {this.shown && (
            <Tag
              {...this.bindings}
              v-html={this.isContentShown ? this.content : ""}
            />
          )}
        </Trans>
      </Teleport>
    );
  },
});
