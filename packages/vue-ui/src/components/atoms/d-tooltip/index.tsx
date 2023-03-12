import {
  PropType,
  VNode,
  Ref,
  defineComponent,
  ref,
  onMounted,
  nextTick,
  watch,
} from "vue";
import type { Font } from "@darwin-studio/ui-codegen/dist/types/font"; // TODO: shorter path, default export ???
import type { Padding } from "@darwin-studio/ui-codegen/dist/types/padding"; // TODO: shorter path, default export ???
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding"; // TODO: shorter path, default export ???
import type { Rounding } from "@darwin-studio/ui-codegen/dist/types/rounding"; // TODO: shorter path, default export ???
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding"; // TODO: shorter path, default export ???
import type { Size } from "@darwin-studio/ui-codegen/dist/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import type { Transition } from "@darwin-studio/ui-codegen/dist/types/transition"; // TODO: shorter path, default export ???
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition"; // TODO: shorter path, default export ???
import fontStyles from "@darwin-studio/ui-codegen/dist/styles/font.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import outlineStyles from "@darwin-studio/ui-codegen/dist/styles/outline.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import paddingStyles from "@darwin-studio/ui-codegen/dist/styles/padding.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import roundingStyles from "@darwin-studio/ui-codegen/dist/styles/rounding.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import sizeStyles from "@darwin-studio/ui-codegen/dist/styles/size.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import transitionStyles from "@darwin-studio/ui-codegen/dist/styles/transition.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName"; // TODO: move to common utils ???
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import useControlId from "@darwin-studio/vue-ui/src/compositions/control-id";
import useScrollOffset from "@darwin-studio/vue-ui/src/compositions/scroll-offset";
import useWindowSize from "@darwin-studio/vue-ui/src/compositions/window-size";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import { POSITION } from "@darwin-studio/vue-ui/src/constants/position";
import { EVENT_KEY } from "@darwin-studio/vue-ui/src/constants/event-key";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import type { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import type { Position } from "@darwin-studio/vue-ui/src/types/position";
import type { Trigger } from "./types";
import { getAdjustedPosition, parsePosition } from "./utils";
import { TRIGGER, BASE_COLOR_SCHEME } from "./constant";
import config from "./config";
import styles from "./index.css?module";

/**
 * Renders tooltip on hover, click or manually. Adjusts tooltip position if there is no enough space.
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Plain string, VNode or HTML if props.enableHtml is true
     */
    target: {
      type: [String, Number, Object] as PropType<Text | VNode>,
    },
    /**
     * You can pass own class name to the <b>target</b> element.
     */
    targetClass: {
      type: String,
    },
    /**
     * Defines font size of the <b>target</b> element. By default depends on props.size
     */
    targetFont: {
      type: String as PropType<Font>,
    },
    /**
     * Plain string, VNode or HTML if props.enableHtml is true
     */
    content: {
      type: [String, Number, Object] as PropType<Text | VNode>,
    },
    /**
     * You can pass own class name to the <b>content</b> element.
     */
    contentClass: {
      type: String,
    },
    /**
     * Defines font size of the <b>content</b> element. By default depends on props.size
     */
    contentFont: {
      type: String as PropType<Font>,
    },
    /**
     * Positions on the component.
     * Takes values: 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left'.
     */
    position: {
      type: String as PropType<Position>,
      default: POSITION.TOP,
      validator: (val: Position) =>
        Boolean(Object.values(POSITION).includes(val)),
    },
    /**
     * Defines offset of the tooltip from the target
     */
    offset: {
      // TODO
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      type: Array as PropType<[number, number]>,
      default: () => [4, 4],
    },
    /**
     * Defines which user action should trigger the tooltip appearance. Use "manual" to control appearance via props.forceShow
     */
    trigger: {
      type: String as PropType<Trigger>,
      default: TRIGGER.HOVER,
    },
    /**
     * Use in pair with trigger="manual" to control the tooltip appearance manually
     */
    forceShow: {
      type: Boolean,
    },
    /**
     * Defines order of selection when navigating with Tab
     */
    tabindex: {
      type: Number,
      default: 0,
    },
    /**
     * Defines should tooltip have arrow
     */
    hasArrow: {
      type: Boolean,
      default: true,
    },
    // TODO: inverse ???
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
     * Defines container element type of the component
     */
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.DIV,
    },
    /**
     * Enables html string rendering passed in props.target and props.content.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    enableHtml: {
      type: Boolean,
    },

    /**
     * Alternative way to catch change event
     */
    whenChange: {
      type: Function as PropType<(value: boolean) => void | Promise<void>>,
    },
  },

  emits: [EVENT_NAME.CHANGE, EVENT_NAME.UPDATE_SHOW],

  // TODO: refac / move somewhere ???
  setup(props) {
    const isShown = ref(false);

    // we will be watching on this to adjust tooltip position
    const { controlId: tooltipId } = useControlId();
    const { scrollOffsetX, scrollOffsetY } = useScrollOffset(
      config.throttleDuration
    );
    const { width, height } = useWindowSize(config.throttleDuration);

    // To manipulate get getBoundingClientRect and adjust tooltip position
    // It's a bit of magic - use the same refs name in the render function and return they from the setup()
    // https://markus.oberlehner.net/blog/refs-and-the-vue-3-composition-api/
    const containerRef: Ref<HTMLElement | null> = ref(null);
    const contentRef: Ref<HTMLElement | null> = ref(null);

    const {
      horizontal: desiredHorizontalPosition,
      vertical: desiredVerticalPosition,
    } = parsePosition(props.position);

    const horizontalPosition = ref(desiredHorizontalPosition);
    const verticalPosition = ref(desiredVerticalPosition);

    onMounted(async () => {
      // We need to wait until children components will be mounted
      await nextTick();

      const adjustedPosition = getAdjustedPosition(
        containerRef,
        contentRef,
        width,
        height,
        desiredHorizontalPosition,
        desiredVerticalPosition
      );

      horizontalPosition.value = adjustedPosition.horizontal;
      verticalPosition.value = adjustedPosition.vertical;
    });

    // adjust position when something changes
    const watchableList = [
      scrollOffsetX,
      scrollOffsetY,
      width,
      height,
      props, // TODO: use more specific ones
    ];
    watchableList.forEach((watchable) =>
      watch(watchable, () => {
        const adjustedPosition = getAdjustedPosition(
          containerRef,
          contentRef,
          width,
          height,
          desiredHorizontalPosition,
          desiredVerticalPosition
        );

        horizontalPosition.value = adjustedPosition.horizontal;
        verticalPosition.value = adjustedPosition.vertical;
      })
    );

    watch(
      () => props.forceShow,
      (show) => {
        isShown.value = show;
      }
    );

    return {
      tooltipId,
      isShown,
      containerRef,
      contentRef,
      horizontalPosition,
      verticalPosition,
    };
  },

  computed: {
    containerClasses(): string[] {
      const classes = [styles[config.className]];
      if (this.isShown) {
        classes.push(styles.isShown);
      }
      if (this.hasArrow) {
        classes.push(styles.hasArrow);
      }
      if (this.horizontalPosition) {
        classes.push(styles[this.horizontalPosition]);
      }
      if (this.verticalPosition) {
        classes.push(styles[this.verticalPosition]);
      }
      return classes;
    },

    contentOffsetStyles(): string | undefined {
      if (!this.offset[0] && !this.offset[1]) {
        return undefined;
      }

      return `margin: ${this.offset[0] || 0}px ${this.offset[1] || 0}px;`;
    },

    renderTarget(): VNode {
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.targetFont || this.size
      );
      // TODO: outline and size and colorScheme separately ???
      const outlineClassName = prepareCssClassName(
        codegenConfig.TOKENS.OUTLINE.CSS_CLASS_PREFIX,
        `${BASE_COLOR_SCHEME}-${this.size}`
      );

      const bindings = {
        tabindex: this.tabindex,
        "aria-describedby": this.tooltipId,
        class: [
          styles[config.targetClassName],
          fontStyles[fontClassName],
          outlineStyles[outlineClassName],
          this.targetClass,
        ],
        onMouseenter: () => this.hoverHandler(true),
        onMouseleave: () => this.hoverHandler(false),
        onFocusin: () => this.hoverHandler(true),
        onFocusout: () => this.hoverHandler(false),
        onClick: () => this.clickHandler(),
        onKeyup: this.keyupHandler,
      };

      if (this.enableHtml) {
        return <div {...bindings} v-html={this.target} />;
      }

      return <div {...bindings}>{this.$slots.target?.() || this.target}</div>;
    },

    renderContent(): VNode {
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.contentFont || this.size
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
      const transitionClassName = prepareCssClassName(
        codegenConfig.TOKENS.TRANSITION.CSS_CLASS_PREFIX,
        this.transition
      );
      const sizeClassName = prepareCssClassName(
        codegenConfig.TOKENS.SIZE.CSS_CLASS_PREFIX,
        this.size
      );

      const bindings = {
        ref: config.contentRef,
        id: this.tooltipId,
        "aria-hidden": !this.isShown,
        role: "tooltip",
        class: [
          styles[config.contentClassName],
          fontStyles[fontClassName],
          paddingStyles[paddingClassName],
          paddingStyles[paddingSizeClassName],
          roundingStyles[roundingClassName],
          sizeStyles[sizeClassName],
          transitionStyles[transitionClassName],
          this.contentClass,
        ],
        style: this.contentOffsetStyles,
      };

      if (this.enableHtml) {
        return <div {...bindings} v-html={this.content} />;
      }

      return <div {...bindings}>{this.$slots.content?.() || this.content}</div>;
    },
  },

  methods: {
    emitShown(): void {
      /**
       * Emits current tooltip state on change.
       *
       * @event change
       * @type {isShown: boolean}
       */
      this.$emit(EVENT_NAME.CHANGE, this.isShown);
      /**
       * Emits current tooltip state on change.
       *
       * @event update:show
       * @type {isShown: boolean}
       */
      this.$emit(EVENT_NAME.UPDATE_SHOW, this.isShown);
      this.whenChange?.(this.isShown);
    },
    // TODO: combine change and toggle !!!
    hoverHandler(isShown = true): void {
      if (this.trigger === TRIGGER.HOVER && this.isShown !== isShown) {
        this.isShown = isShown;
        this.emitShown();
      }
    },
    clickHandler(): void {
      if (this.trigger === TRIGGER.CLICK) {
        this.isShown = !this.isShown;
        this.emitShown();
      }
    },
    keyupHandler(event: KeyboardEvent): void {
      if (this.trigger === TRIGGER.MANUAL) {
        return;
      }

      if (event.key === EVENT_KEY.Enter || event.key === EVENT_KEY.Space) {
        this.isShown = true;
        this.emitShown();
      } else if (event.key === EVENT_KEY.Escape) {
        this.isShown = false;
        this.emitShown();
      }
    },
  },

  /*TODO: why vue-docgen cant' detect not default slots ???*/
  /**
   * @slot $slots.target
   * Use instead of props.target to fully customize target
   * */
  /**
   * @slot $slots.content
   * Use instead of props.error to fully customize content
   * */
  render(): VNode {
    const Tag = this.tag;

    return (
      <Tag ref={config.containerRef} class={this.containerClasses}>
        {this.renderTarget}
        {this.renderContent}
      </Tag>
    );
  },
});
