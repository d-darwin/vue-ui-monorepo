import { PropType } from "vue";

/**
 * Pass any attrs to a content element, f.e. { class: "someClass" }
 */
const generateContentOptionsProp = <T>(defaultValue?: T) => ({
  type: Object as PropType<T>,
  default: () => defaultValue,
});

export default generateContentOptionsProp;
