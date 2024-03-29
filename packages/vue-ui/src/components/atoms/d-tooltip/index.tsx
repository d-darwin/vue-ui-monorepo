import { defineComponent, ref, onMounted, nextTick, watch } from "vue";
import type { PropType, VNode, Ref } from "vue";
import { v4 as uuid } from "uuid";
import useScrollOffset from "@darwin-studio/vue-ui/src/compositions/scroll-offset";
import useWindowSize from "@darwin-studio/vue-ui/src/compositions/window-size";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import { POSITION } from "@darwin-studio/vue-ui/src/constants/position";
import { EVENT_KEY } from "@darwin-studio/vue-ui/src/constants/event-key";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
import type { Position } from "@darwin-studio/vue-ui/src/types/position";
import type { Trigger } from "./types";
import { getAdjustedPosition, parsePosition } from "./utils";
import { TRIGGER } from "./constant";
import config from "./config";
import styles from "./index.css?module";

/**
 * Renders tooltip on hover, click or manually. Adjusts tooltip position if there is no enough space.
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Plain string or VNode
     */
    target: generateProp.content(),
    /**
     * You can pass own class name to the <b>target</b> element.
     */
    // TODO: targetOptions
    targetClass: String,
    /**
     * Defines font size of the <b>target</b> element. By default depends on props.size
     */
    // TODO: targetOptions
    targetFont: generateProp.font(undefined, true),
    /**
     * Plain string or VNode
     */
    content: generateProp.content(),
    /**
     * You can pass own class name to the <b>content</b> element.
     */
    // TODO: contentOptions
    contentClass: String,
    /**
     * Defines font size of the <b>content</b> element. By default depends on props.size
     */
    // TODO: contentOptions
    contentFont: generateProp.font(undefined, true),
    /**
     * Positions on the component.
     * Takes values: 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left'.
     */
    position: generateProp.string<Position>(POSITION.TOP),
    /**
     * Defines offset of the tooltip from the target
     */
    offset: {
      type: Array as unknown as PropType<[number, number]>,
      default: () => [4, 4],
    },
    /**
     * Defines which user action should trigger the tooltip appearance. Use "manual" to control appearance via props.forceShow
     */
    trigger: generateProp.string<Trigger>(TRIGGER.HOVER),
    /**
     * Use in pair with trigger="manual" to control the tooltip appearance manually
     */
    forceShow: Boolean,
    /**
     * Defines order of selection when navigating with Tab
     */
    tabindex: generateProp.number(0),
    /**
     * Defines should tooltip have arrow
     */
    hasArrow: generateProp.boolean(true),
    // TODO: inverse ???
    /**
     * Defines padding type of the component, use 'equal' if the component contains only an icon
     */
    padding: generateProp.padding(),
    /**
     * Defines corner rounding of the component
     */
    rounding: generateProp.rounding(),
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
    const tooltipId = uuid();
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
      [config.containerRef]: containerRef,
      [config.contentRef]: contentRef,
      horizontalPosition,
      verticalPosition,
    };
  },

  computed: {
    containerClasses(): string[] {
      const classes = [config.class];
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
      const bindings = {
        tabindex: this.tabindex,
        "aria-describedby": this.tooltipId,
        class: [
          config.targetClass,
          this.targetClass,
          generateClass.font(this.targetFont || this.size),
          generateClass.outline(COLOR_SCHEME.SECONDARY, this.size), // TODO: config or props
        ],
        onMouseenter: () => this.hoverHandler(true),
        onMouseleave: () => this.hoverHandler(false),
        onFocusin: () => this.hoverHandler(true),
        onFocusout: () => this.hoverHandler(false),
        onClick: () => this.clickHandler(),
        onKeyup: this.keyupHandler,
      };

      return <div {...bindings}>{this.$slots.target?.() || this.target}</div>;
    },

    renderContent(): VNode {
      // TODO: move to getters
      const bindings = {
        ref: config.contentRef,
        id: this.tooltipId,
        "aria-hidden": !this.isShown,
        role: "tooltip",
        class: [
          config.contentClass,
          this.contentClass,
          generateClass.font(this.contentFont || this.size),
          ...generateClass.padding(this.padding, this.size),
          generateClass.rounding(this.rounding),
          generateClass.size(this.size),
          generateClass.transition(this.transition),
        ],
        style: this.contentOffsetStyles,
      };

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
