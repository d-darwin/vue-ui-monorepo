import { ref, onMounted, onUnmounted } from "vue";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import throttle from "@darwin-studio/vue-ui/src/utils/throttle";

/**
 * Watches on current scroll offset.
 * @param ms throttle duration
 * @returns {{scrollOffsetY: Ref<UnwrapRef<number>>, scrollOffsetX: Ref<UnwrapRef<number>>}}
 */
export default function useScrollOffset(ms: number) {
  //TODO: refactor
  let throttledOnScroll: (() => void) | null = null;

  const scrollOffsetY = ref(0);
  const scrollOffsetX = ref(0);

  const onScroll = () => {
    scrollOffsetY.value = window?.scrollY;
    scrollOffsetX.value = window?.scrollX;
  };

  onMounted(() => {
    if (process.browser) {
      // get current offset on mounted
      onScroll();
      // hold function pointer to remove event listener when the component will be unmounted
      throttledOnScroll = throttle(onScroll, ms);
      // watch on offset on scroll
      // use passive mode to notify browser that it can perform default action immediately
      window.addEventListener(EVENT_NAME.SCROLL, throttledOnScroll, {
        passive: true,
      });
    }
  });

  onUnmounted(() => {
    if (process.browser && throttledOnScroll) {
      // prevent memory leaks
      window.removeEventListener(EVENT_NAME.SCROLL, throttledOnScroll);
    }
  });

  return {
    scrollOffsetY,
    scrollOffsetX,
  };
}
