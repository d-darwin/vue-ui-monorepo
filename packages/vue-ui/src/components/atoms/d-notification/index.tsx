import {
  defineComponent,
  PropType,
  VNode,
  Teleport,
  Transition as Trans,
  CSSProperties,
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
import { prepareSize } from "./utils";
import { Type } from "./types";
import { TYPE } from "./constants";
import config from "./config";
import styles from "./index.css?module";

// TODO
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Plain string, VNode or HTML if props.enableHtml is true
     */
    content: {
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
     * If close button shown.
     */
    closable: {
      type: Boolean,
      default: true,
    },
    /**
     * TODO
     */
    minWidth: {
      type: [String, Number],
    },
    /**
     * TODO
     */
    maxWidth: {
      type: [String, Number],
    },
    /**
     * TODO
     */
    minHeight: {
      type: [String, Number],
    },
    /**
     * TODO
     */
    maxHeight: {
      type: [String, Number],
    },
    /**
     * Defines container element type of the component
     */
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.DIV,
    },
    /**
     * Defines how long the notification will be displayed.
     */
    duration: {
      type: Number,
      default: 0, // TODO: 5
    },
    /**
     * You can pass own class name to the <b>notification</b> element.
     */
    notificationClass: {
      type: String,
    },
    /**
     * TODO
     */
    target: {
      type: [String, Object] as PropType<string | RendererElement>,
      default: config.defaultTarget,
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
      // TODO: hover ??? dont use at all ???
      type: String as PropType<ColorScheme>,
      default: COLOR_SCHEME.PRIMARY, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * TODO
     */
    type: {
      type: String as PropType<Type>,
      default: TYPE.INFO,
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
      default: ROUNDING.MEDIUM, // TODO: gent defaults base on actual values, not hardcoded
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
     * Enables html string rendering passed in props.label and props.error.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    enableHtml: {
      type: Boolean,
    },
  },

  mounted() {
    this.show();
  },

  beforeUnmount() {
    clearTimeout(this.timeoutHandler);
  },

  // TODO: move to setup()
  data() {
    return {
      shown: false as boolean,
      timeoutHandler: undefined as number | undefined, // TODO: naming
    };
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
      | (string | undefined)[]
      | CSSProperties
      | ((event: MouseEvent) => void | Promise<void>)
    > {
      return {
        class: this.classes,
        style: this.styles,
        onClick: this.close,
      };
    },
  },

  methods: {
    show(): void {
      this.shown = true;
      if (!this.duration) {
        return;
      }

      clearTimeout(this.timeoutHandler);

      this.timeoutHandler = setTimeout(() => {
        this.shown = false;
      }, this.duration * 1000);
    },

    close(): void {
      if (!this.closable) {
        return;
      }
      this.shown = false;
      clearTimeout(this.timeoutHandler);
    },
  },

  render(): VNode {
    const Tag = this.tag;

    if (!this.enableHtml) {
      /** @slot Use instead of props.content to fully customize content */
      return (
        <Teleport to="body">
          <Trans
            enterActiveClass={styles.transitionEnterActive}
            leaveActiveClass={styles.transitionLeaveActive}
          >
            {this.shown && (
              <Tag {...this.bindings}>
                {this.$slots.default?.() || this.content}
              </Tag>
            )}
          </Trans>
        </Teleport>
      );
    }

    return (
      <Teleport to={this.target}>
        <Trans
          enterActiveClass={styles.transitionEnterActive}
          leaveActiveClass={styles.transitionLeaveActive}
        >
          {this.shown && <Tag {...this.bindings} v-html={this.content} />}
        </Trans>
      </Teleport>
    );
  },
});
