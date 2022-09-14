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
import type { Padding } from "@darwin-studio/vue-ui-codegen/dist/types/padding"; // TODO: shorter path, default export ???
import { PADDING } from "@darwin-studio/vue-ui-codegen/dist/constants/padding"; // TODO: shorter path, default export ???
import type { Rounding } from "@darwin-studio/vue-ui-codegen/dist/types/rounding"; // TODO: shorter path, default export ???
import { ROUNDING } from "@darwin-studio/vue-ui-codegen/dist/constants/rounding"; // TODO: shorter path, default export ???
import type { Size } from "@darwin-studio/vue-ui-codegen/dist/types/size"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import type { Transition } from "@darwin-studio/vue-ui-codegen/dist/types/transition"; // TODO: shorter path, default export ???
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition"; // TODO: shorter path, default export ???
import paddingStyles from "@darwin-studio/vue-ui-codegen/dist/styles/padding.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import roundingStyles from "@darwin-studio/vue-ui-codegen/dist/styles/rounding.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import sizeStyles from "@darwin-studio/vue-ui-codegen/dist/styles/size.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import transitionStyles from "@darwin-studio/vue-ui-codegen/dist/styles/transition.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName"; // TODO: move to common utils ???
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import type { Position } from "@darwin-studio/vue-ui/src/components/atoms/d-tooltip/types";
import { POSITION } from "@darwin-studio/vue-ui/src/components/atoms/d-tooltip/constant";
import useControlId from "@darwin-studio/vue-ui/src/compositions/control-id";
import useScrollOffset from "@darwin-studio/vue-ui/src/compositions/scroll-offset";
import useWindowSize from "@darwin-studio/vue-ui/src/compositions/window-size";
import {
  getAdjustedPosition,
  parsePosition,
} from "@darwin-studio/vue-ui/src/components/atoms/d-tooltip/utils";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import styles from "./index.module.css";
import config from "./config";
import codegenConfig from "@darwin-studio/vue-ui-codegen/config.json";

// TODO: on click or manually
/**
 * Renders tooltip on hover, click or manually. Adjusts tooltip position if there is no enough space.
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Plain string or HTML if props.enableHtml is true
     */
    target: {
      type: [String, Number] as PropType<Text>, // TODO: VNode ???
    },
    // TODO: font
    // TODO: class
    /**
     * Plain string or HTML if props.enableHtml is true
     */
    content: {
      type: [String, Number] as PropType<Text>, // TODO: VNode ???
    },
    // TODO: font
    // TODO: class
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
    // TODO: add outline
    // TODO: make offset configurable
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
     * Defines should tooltip have arrow
     */
    hasArrow: {
      type: Boolean,
      default: true,
    },
    // TODO: inverse
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

    /**
     * Alternative way to catch change event
     */
    whenChange: {
      type: Function as PropType<(value: boolean) => void | Promise<void>>,
    },
  },

  emits: [EVENT_NAME.CHANGE, EVENT_NAME.UPDATE_SHOW],

  // TODO: refac
  setup(props) {
    const isShown = ref(false);

    // we will be watching on this to adjust tooltip position
    const { controlId } = useControlId();
    const { scrollOffsetX, scrollOffsetY } = useScrollOffset(
      config.throttleDuration
    );
    const { windowWidth, windowHeight } = useWindowSize(
      config.throttleDuration
    );

    // To manipulate get getBoundingClientRect and adjust tooltip position
    // It's a bit of magic - use the same refs name in the render function and return they from the setup()
    // https://markus.oberlehner.net/blog/refs-and-the-vue-3-composition-api/
    const tooltipContainer: Ref<HTMLElement | null> = ref(null);
    const tooltip: Ref<HTMLElement | null> = ref(null);

    const {
      horizontal: defaultHorizontalPosition,
      vertical: defaultVerticalPosition,
    } = parsePosition(props.position);

    const horizontalPosition = ref(defaultHorizontalPosition);
    const verticalPosition = ref(defaultVerticalPosition);

    onMounted(async () => {
      // We need to wait until children components will be mounted
      await nextTick();

      const adjustedPosition = getAdjustedPosition(
        tooltipContainer,
        tooltip,
        windowWidth,
        windowHeight,
        defaultHorizontalPosition,
        defaultVerticalPosition
      );

      horizontalPosition.value = adjustedPosition.horizontal;
      verticalPosition.value = adjustedPosition.vertical;
    });

    // adjust position when something changes
    const watchableList = [
      scrollOffsetX,
      scrollOffsetY,
      windowWidth,
      windowHeight,
      props, // TODO: use more specific ones
    ];
    watchableList.forEach((watchable) =>
      watch(watchable, () => {
        const adjustedPosition = getAdjustedPosition(
          tooltipContainer,
          tooltip,
          windowWidth,
          windowHeight,
          defaultHorizontalPosition,
          defaultVerticalPosition
        );

        horizontalPosition.value = adjustedPosition.horizontal;
        verticalPosition.value = adjustedPosition.vertical;
      })
    );

    return {
      controlId,
      isShown,
      tooltipContainer,
      tooltip,
      horizontalPosition,
      verticalPosition,
    };
  },

  computed: {
    containerClasses(): string[] {
      const classes = [styles[config.className]];
      if (this.horizontalPosition) {
        classes.push(styles[this.horizontalPosition]);
      }
      if (this.verticalPosition) {
        classes.push(styles[this.verticalPosition]);
      }
      if (this.hasArrow) {
        classes.push(styles.hasArrow);
      }
      return classes;
    },

    renderTarget(): VNode {
      if (this.enableHtml) {
        return <div aris-describedby={this.controlId} v-html={this.target} />;
      }

      return (
        <div aris-describedby={this.controlId}>
          {this.$slots.target?.() || this.target}
        </div>
      );
    },

    renderContent(): VNode {
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
        ref: config.tooltipRef,
        id: this.controlId,
        ariaHidden: !this.isShown,
        class: [
          styles[config.tooltipClassName], // TODO: naming
          paddingStyles[paddingClassName],
          paddingStyles[paddingSizeClassName],
          roundingStyles[roundingClassName],
          sizeStyles[sizeClassName],
          transitionStyles[transitionClassName],
        ],
      };

      if (this.enableHtml) {
        return <div {...bindings} v-html={this.content} />;
      }

      return <div {...bindings}>{this.$slots.content?.() || this.content}</div>;
    },
  },

  methods: {
    changeShown(isShown = true): void {
      this.isShown = isShown;

      /**
       * Emits current tooltip state on change.
       *
       * @event change
       * @type {isShown: boolean}
       */
      this.$emit(EVENT_NAME.CHANGE, isShown);
      /**
       * Emits current tooltip state on change.
       *
       * @event update:show
       * @type {isShown: boolean}
       */
      this.$emit(EVENT_NAME.UPDATE_SHOW, isShown);
      this.whenChange?.(isShown);
    },
  },

  render(): VNode {
    return (
      <div
        ref={config.componentRef}
        class={this.containerClasses}
        onMouseenter={() => this.changeShown()}
        onFocus={() => this.changeShown()}
        onMouseleave={() => this.changeShown(false)}
        onBlur={() => this.changeShown(false)}
      >
        {this.renderTarget}
        {this.renderContent}
      </div>
    );
  },
});
