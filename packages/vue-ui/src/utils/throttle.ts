/**
 * Simple implementation of the throttle technique
 *  which doesn't allow to our function to execute more than once every X milliseconds.
 * See example usage in '@dariwn-studio/ui-vue/compositions/windowSize.js'.
 *
 * @param func
 * @param ms
 * @returns {function(): undefined}
 */
export default function throttle(func: () => void, ms: number): () => void {
  let isThrottled = false;
  let savedArgs: [] | null;
  let savedThis: object | null;

  return function wrapper(...args: []) {
    if (isThrottled) {
      savedArgs = args;
      // TODO
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      savedThis = this;
      return;
    }

    // TODO
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    func.apply(this, args);

    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  };
}
