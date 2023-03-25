import { defineComponent, VNode } from "vue";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
import config from "./config";
import styles from "./d-details.css?module";

/**
 * TODO
 */
export default defineComponent({
  name: config.detailsName,

  props: {
    /**
     * Plain string or VNode
     */
    summary: generateProp.content(),
    // TODO: summaryOptions
    /**
     * Plain string or VNode
     */
    content: generateProp.content(),
    // TODO: contentOptions

    // TODO: colorScheme
    colorScheme: generateProp.colorScheme(),

    // TODO: padding
    padding: generateProp.padding(),

    // TODO: roundness
    rounding: generateProp.rounding(),

    // TODO: font ???
    // TODO: size
    size: generateProp.size(),

    // TODO: disabled ???

    // TODO: whenToggle
  },

  computed: {
    classes(): (string | undefined)[] {
      return [
        styles[config.detailsClassName],
        generateClass.colorScheme(this.colorScheme),
        generateClass.font(this.size),
        generateClass.rounding(this.rounding),
        generateClass.size(this.size),
      ];
    },

    summaryClasses(): (string | undefined)[] {
      return [
        styles[config.summaryClassName],
        generateClass.padding(this.padding), // TODO: merge in the util
        generateClass.padding(`${this.padding}-${this.size}`), // TODO: merge in the util
      ];
    },

    contentClasses(): (string | undefined)[] {
      return [
        styles[config.contentClassName],
        generateClass.padding(this.padding), // TODO: merge in the util
        generateClass.padding(`${this.padding}-${this.size}`), // TODO: merge in the util
      ];
    },
  },

  // TODO: slots descr
  render(): VNode {
    return (
      <details class={this.classes}>
        <summary class={this.summaryClasses}>
          {/*TODO: $slots.before/after*/}
          {this.$slots.summary?.() || this.summary}
          {/*TODO: $slots.before/after*/}
        </summary>
        <div class={this.contentClasses}>
          {this.$slots.default?.() || this.content}
        </div>
        {/*TODO: or whole content including summary ???*/}
      </details>
    );
  },
});
