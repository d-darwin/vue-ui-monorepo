import { ref, onMounted, onUnmounted, Ref } from "vue";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import throttle from "@darwin-studio/vue-ui/src/utils/throttle";

/**
 * Watches for resize and change windowHeight, windowWidth and deviceWidth
 * if any breakpoint was crossed.
 * @param ms throttle duration
 * @returns {{deviceWidth: number, windowHeight: number, windowWidth: string}}
 */
export default function useWindowSize(ms: number) {
  const windowHeight: Ref = ref(0);
  const windowWidth: Ref = ref(0);

  let throttledOnResize: (() => void) | null = null;

  function onResize() {
    if (process.browser) {
      windowHeight.value = document?.documentElement?.clientHeight;
      windowWidth.value = document?.documentElement?.clientWidth;
    }
  }

  onMounted(() => {
    if (process.browser) {
      // execute when mounted first time
      onResize();

      throttledOnResize = throttle(onResize, ms);
      window.addEventListener(EVENT_NAME.RESIZE, throttledOnResize);
    }
  });

  onUnmounted(() => {
    if (process.browser && throttledOnResize) {
      window.removeEventListener(EVENT_NAME.RESIZE, throttledOnResize);
    }
  });

  return { windowHeight, windowWidth };
}
