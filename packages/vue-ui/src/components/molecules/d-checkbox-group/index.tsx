import { defineComponent, PropType, VNode } from "vue";
import { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import config from "./config";
import styles from "./index.css?module";

/**
 * TODO
 */
export default defineComponent({
  name: config.name,

  props: {
    // TODO: items
    // TODO: label, font, class ...
    // TODO: error, font, class ...
    /**
     * Defines container element type of the component
     */
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.FIELDSET,
    },
    // TODO: enableHtml
    // TODO: whenChange
  },

  render(): VNode {
    const Tag = this.tag;

    return (
      <Tag class={styles[config.className]}>
        {/*        {this.renderLabel}
        {this.renderItemList}
        {this.renderError}*/}
      </Tag>
    );
  },
});
