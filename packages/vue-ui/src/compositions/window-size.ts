import { ref, onMounted, onUnmounted, Ref } from "vue";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import throttle from "@darwin-studio/vue-ui/src/utils/throttle";

export const DEFAULT_THROTTLE_DURATION = 100;

/**
 * Watches for resize and change height, width and size if any breakpoint was crossed.
 * @param ms throttle duration
 * @returns {{height: number, width: number, size: string}}
 */
export default function useWindowSize(ms: number = DEFAULT_THROTTLE_DURATION) {
  const height: Ref = ref(0);
  const width: Ref = ref(0);
  const size: Ref = ref("");

  // TODO: get from codegen
  const breakpointList = {
    sm: 320,
    md: 640,
    lg: 768,
    xl: 1024,
    xxl: 1200,
  };

  let throttledOnResize: (() => void) | null = null;

  function onResize() {
    if (typeof window !== "undefined") {
      height.value = document?.documentElement?.clientHeight;
      width.value = document?.documentElement?.clientWidth; // TODO: safari fix

      // todo: arrange it while codegen
      if (width.value < breakpointList.sm) {
        // smallest
        size.value = "xs";
      } else if (
        width.value >= breakpointList.sm &&
        width.value < breakpointList.md
      ) {
        size.value = "sm";
      } else if (
        width.value >= breakpointList.md &&
        width.value < breakpointList.lg
      ) {
        size.value = "md";
      } else if (
        width.value >= breakpointList.lg &&
        width.value < breakpointList.xl
      ) {
        size.value = "lg";
      } else if (
        width.value >= breakpointList.xl &&
        width.value < breakpointList.xxl
      ) {
        size.value = "xl";
      } else if (width.value >= breakpointList.xxl) {
        // biggest
        size.value = "xxl";
      }
    }
  }

  onMounted(() => {
    if (typeof window !== "undefined") {
      // execute when mounted first time
      onResize();

      throttledOnResize = throttle(onResize, ms);
      window.addEventListener(EVENT_NAME.RESIZE, throttledOnResize);
    }
  });

  onUnmounted(() => {
    if (typeof window !== "undefined" && throttledOnResize) {
      window.removeEventListener(EVENT_NAME.RESIZE, throttledOnResize);
    }
  });

  return { height, width, size };
}
