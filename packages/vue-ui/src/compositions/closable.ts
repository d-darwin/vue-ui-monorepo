import { watch, nextTick, onBeforeUnmount } from "vue";
import { v4 as uuid } from "uuid";
import useSetBodyOverflow from "./set-body-overflow";

/**
 * TODO
 *
 * @param props
 * @returns {{closeButtonId: string}}
 */
export default function useClosable(props: { isShown?: boolean }) {
  const { setBodyOverflow } = useSetBodyOverflow();
  const closeButtonId = uuid(); // TODO: use control id ???
  let activeElement: Element | HTMLElement | null = null;

  watch(
    () => props.isShown,
    async (isShown) => {
      if (isShown) {
        setBodyOverflow();
        activeElement = document.activeElement;
        await nextTick(() => {
          const closeButton = document.getElementById(closeButtonId);
          closeButton?.focus?.();
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

  return { closeButtonId };
}
