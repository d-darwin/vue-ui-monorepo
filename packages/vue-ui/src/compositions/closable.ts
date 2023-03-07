import { watch, nextTick, onBeforeUnmount } from "vue";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import useSetBodyOverflow from "./set-body-overflow";
import useControlId from "./control-id";

/**
 * Blocks body scroll, move focus to the props.focusId (or close button by default) and emits 'close' event by 'Esc' key.
 *
 * @param props
 * @returns {{focusControlId: string}}
 */
export default function useClosable(props: {
  isShown?: boolean;
  focusId?: Text;
}) {
  const { controlId: focusControlId } = useControlId({
    ...props,
    id: props.focusId,
  });
  const { setBodyOverflow } = useSetBodyOverflow();
  let activeElement: Element | HTMLElement | null = null;

  // TODO: esc key -> emit('close'), props.whenClose()

  watch(
    () => props.isShown,
    async (isShown) => {
      if (isShown) {
        setBodyOverflow();
        activeElement = document.activeElement;
        await nextTick(() => {
          document.getElementById(focusControlId.value)?.focus?.();
        });
      } else {
        setBodyOverflow(false);
        (activeElement as HTMLElement)?.focus?.();
      }
    }
  );

  onBeforeUnmount(() => {
    // ensure that body scrolling isn't blocked
    setBodyOverflow(false);
  });

  return { focusControlId };
}
