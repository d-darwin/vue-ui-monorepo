import { defineComponent, type VNode } from "vue";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import styles from "./index.css?module";
import config from "./config";

export default defineComponent({
  name: config.name,

  props: {
    /**
     * Plain string or VNode
     */
    content: generateProp.content(), // TODO: use or remove
    /**
     * Defines appearance of the component
     */
    colorScheme: generateProp.colorScheme(),
    /**
     * Defines size of the component
     */
    // TODO: fontSize and size separately ???
    font: generateProp.font(),
    /**
     * Defines corner rounding of the component
     */
    rounding: generateProp.rounding(),
    /**
     * Defines size of the component
     */
    // TODO: fontSize and size separately ???
    size: generateProp.size(),
    /**
     * Defines transition type of the component
     */
    transition: generateProp.transition(),
    /**
     * Defines container element type of the component
     */
    tag: generateProp.tag(),
  },

  render(): VNode {
    const Tag = this.tag;
    return <Tag class={styles[config.className]}></Tag>;
  },
});
