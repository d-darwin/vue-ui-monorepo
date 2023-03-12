import { PropType, VNode } from "vue";
import { Text } from "@darwin-studio/vue-ui/src/types/text";

/**
 * Pass any content to the component or it's child
 */
const generateContentProp = (defaultValue?: Text | VNode) => ({
  type: [String, Number, Object] as PropType<Text | VNode>,
  default: defaultValue,
});

export default generateContentProp;
