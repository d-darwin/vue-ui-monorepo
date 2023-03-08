// TODO: tests

/**
 * Simple implementation of the debounce technique
 *  which allows us to “group” multiple sequential calls in a single one after X milliseconds of “silence“.
 *
 * @param func
 * @param ms
 * @returns {function(): undefined}
 */
export default function debounce(func: () => void, ms: number) {
  let isCoolDown = false;

  return function wrapper(...args: []) {
    if (isCoolDown) return;
    // TODO
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    func.apply(this, args);

    isCoolDown = true;

    setTimeout(() => (isCoolDown = false), ms);
  };
}
