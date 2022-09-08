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
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import { POSITION } from "@darwin-studio/vue-ui/src/components/atoms/d-tooltip/constant";
import type { Position } from "@darwin-studio/vue-ui/src/components/atoms/d-tooltip/types";
import useControlId from "@darwin-studio/vue-ui/src/compositions/control-id";
import useScrollOffset from "@darwin-studio/vue-ui/src/compositions/scroll-offset";
import useWindowSize from "@darwin-studio/vue-ui/src/compositions/window-size";
import {
  getAdjustedPosition,
  parsePosition,
} from "@darwin-studio/vue-ui/src/components/atoms/d-tooltip/utils";
import styles from "./index.module.css";
import config from "./config";

/**
 * Renders tooltip on hover, click or manually. Adjusts tooltip position if there is no enough space.
 */
export default defineComponent({
  name: config.name,

  props: {
    // TODO: target / reference
    /**
     * Plain string or HTML if props.enableHtml is true
     */
    content: {
      type: [String, Number] as PropType<Text>,
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
    // TODO: hasArrow
    // TODO: enableHtml
  },

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
    // It's a bit of magic - use the same refs in the render function and your shout to return it from setup()
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
      // We need to wait until children components will be mounted (if there are)
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
      props, // TODO: more specific ones
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

  methods: {
    updateShown(show = true): void {
      this.isShown = show;

      /**
       * Emits current tooltip state on change.
       *
       * @event update:show
       * @type {boolean}
       */
      this.$emit("update:show", show);
    },
  },

  render(): VNode {
    return (
      <div
        ref={config.componentRef}
        class={styles[config.className]}
        onMouseenter={() => this.updateShown()}
        onFocus={() => this.updateShown()}
        onMouseleave={() => this.updateShown(false)}
        onBlur={() => this.updateShown(false)}
      >
        <slot aria-describedby={this.controlId} />
        <div ref={config.tooltipRef}>Tooltip</div>
        {this.controlId}*{this.isShown}*{this.tooltipContainer}*{this.tooltip}*
        {this.horizontalPosition}*{this.verticalPosition}*
      </div>
    );
  },
});
