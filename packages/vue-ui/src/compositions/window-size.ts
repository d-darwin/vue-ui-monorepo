import { ref, onMounted, onUnmounted, Ref } from "vue";
import { EVENT_NAME } from "@/constants/event-name";
import throttle from "@/utils/throttle";

/**
 * Watches for resize and change windowHeight, windowWidth and deviceWidth
 * if any breakpoint was crossed.
 *
 * @returns {{deviceWidth: number, windowHeight: number, windowWidth: string}}
 */
export default function useWindowSize() {
  const windowHeight: Ref = ref(null);
  const windowWidth: Ref = ref(null);
  const deviceWidth: Ref = ref(null);

  let throttledOnResize: (() => void) | null = null;

  function onResize() {
    if (process.browser) {
      windowHeight.value = document && document.documentElement.clientHeight;
      windowWidth.value = document && document.documentElement.clientWidth;
    }
  }

  onMounted(() => {
    if (process.browser) {
      // execute when mounted first time
      onResize();

      throttledOnResize = throttle(onResize, 100);
      window.addEventListener(EVENT_NAME.RESIZE, throttledOnResize);
    }
  });

  onUnmounted(() => {
    if (process.browser && throttledOnResize) {
      window.removeEventListener("resize", throttledOnResize);
    }
  });

  return { windowHeight, windowWidth, deviceWidth };
}
