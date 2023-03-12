import { PropType } from "vue";
import { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";

/**
 * Defines html element type of the component
 */
const generateTagProp = (defaultValue: TagName = TAG_NAME_DEFAULTS.DIV!) => ({
  type: String as PropType<TagName>,
  default: defaultValue,
});

export default generateTagProp;
