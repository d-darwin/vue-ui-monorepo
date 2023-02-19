import { ref, onMounted, onUnmounted, Ref } from "vue";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import throttle from "@darwin-studio/vue-ui/src/utils/throttle";
import {
  BREAKPOINTS,
  BREAKPOINTS_VALUE,
} from "@darwin-studio/ui-codegen/dist/constants/breakpoints";

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

  let throttledOnResize: (() => void) | null = null;

  function onResize() {
    if (typeof window !== "undefined") {
      height.value = document?.documentElement?.clientHeight;
      width.value = document?.documentElement?.clientWidth; // TODO: safari fix

      const breakpointList = Object.entries(BREAKPOINTS_VALUE).sort(
        (a, b) => Number(b[1]) - Number(a[1])
      );
      breakpointList.some((item) => {
        if (width.value >= Number(item[1])) {
          size.value = BREAKPOINTS[item[0] as keyof typeof BREAKPOINTS]; // TODO: try to avoid such casting
          console.log(size.value);
          return true;
        }
        return false;
      });
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
