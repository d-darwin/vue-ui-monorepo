import { watch, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import useSetBodyOverflow from "./set-body-overflow";

// TODO: tests

/**
 * Blocks body scroll, move focus to the props.focusId (or close button by default) and emits 'close' event by 'Escape' key.
 *
 * @param props
 * @param emit
 * @returns {{focusId: string}}
 */
export default function useClosable(
  props: {
    isShown?: boolean;
    isModal?: boolean;
    focusId?: Text;
    whenClose?: () => void;
  },
  emit: (eventName: "close") => void
) {
  const closeFocusId = ref(props.focusId);
  const { setBodyOverflow } = useSetBodyOverflow();
  let activeElement: Element | HTMLElement | null = null;
  let keyupHandler: ((event: KeyboardEvent) => void) | null = null;

  onMounted(() => {
    if (typeof window !== "undefined") {
      keyupHandler = (event: KeyboardEvent) => {
        if (event.key === "Escape" && props.isShown && props.isModal) {
          emit("close");
          props.whenClose?.();
        }
      };

      // use passive mode to notify browser that it can perform default action immediately
      window.addEventListener(EVENT_NAME.KEYUP, keyupHandler, {
        passive: true,
      });
    }
  });

  watch(
    () => props.isShown,
    async (isShown) => {
      if (isShown) {
        if (props.isModal) {
          // TODO: make other body children inert
          setBodyOverflow();
        }
        activeElement = document.activeElement;
        await nextTick(() => {
          document.getElementById(String(closeFocusId.value))?.focus?.();
        });
      } else {
        if (props.isModal) {
          // TODO: make other body children uninert
          setBodyOverflow(false);
        }
        (activeElement as HTMLElement)?.focus?.();
      }
    }
  );

  onBeforeUnmount(() => {
    // ensure that body scrolling isn't blocked
    // TODO: test case
    setBodyOverflow(false);

    if (typeof window !== "undefined" && keyupHandler) {
      // TODO: test case
      window.removeEventListener(EVENT_NAME.KEYUP, keyupHandler);
    }
  });

  return { closeFocusId };
}
