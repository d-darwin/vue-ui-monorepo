/**
 * TOOD
 * @returns {function}
 */
export default function useSetBodyOverflow() {
  const setBodyOverflow = (isHidden = true) => {
    if (document?.body && isHidden) {
      document.body.style.overflow = "hidden";
      /*TODO: overcome step body widening*/
    } else {
      document.body.style.overflow = "initial";
    }
  };

  return {
    setBodyOverflow,
  };
}
