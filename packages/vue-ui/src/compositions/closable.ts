import { watch, nextTick, onBeforeUnmount } from "vue";
import { v4 as uuid } from "uuid";
import useSetBodyOverflow from "./set-body-overflow";

/**
 * TODO
 *
 * @param props
 * @returns {{focusControlId: string}}
 */
export default function useClosable(props: { isShown?: boolean }) {
  const { setBodyOverflow } = useSetBodyOverflow();
  const focusControlId = uuid(); // TODO: use control id ???
  let activeElement: Element | HTMLElement | null = null;

  watch(
    () => props.isShown,
    async (isShown) => {
      if (isShown) {
        setBodyOverflow();
        activeElement = document.activeElement;
        await nextTick(() => {
          document.getElementById(focusControlId)?.focus?.();
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
