import type { HTMLAttributes, PropType } from "vue";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import DDetails from "@darwin-studio/vue-ui/src/components/molecules/d-accordion/d-details";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import config from "./config";

export const dAccordionProps = {
  /**
   * An array of DDetails
   */
  content: {
    type: Array as PropType<(typeof DDetails | undefined)[]>,
  },

  // TODO: specific props: isSolo, someOpen ???
  /**
   * TODO
   */
  isSolo: Boolean,
  // TODO: openId\Value ???
  //  https://vuetifyjs.com/en/components/expansion-panels/
  /**
   * TODO
   */
  openId: generateProp.text(),
  /**
   * Don't show content after the summary
   */
  hideSummaryAfter: Boolean,
  /**
   * Pass true to make the component disabled
   */
  disabled: Boolean,
  /**
   * Defines appearance of the component
   */
  colorScheme: generateProp.colorScheme(),
  /**
   * Defines padding type of the component, use 'equal' if the component contains only an icon
   */
  padding: generateProp.padding(),
  /**
   * Defines corner rounding of the component
   */
  rounding: generateProp.rounding(),
  /**
   * Defines size of the component
   */
  size: generateProp.size(),
  /**
   * Defines transition type of the component
   */
  transition: generateProp.transition(),
  /**
   * Defines container element type of the component
   */
  tag: generateProp.tag(),

  /**
   * Alternative way to catch toggle event with current open attr in the payload
   */
  whenChange: Function as PropType<
    (id: Text, open?: boolean) => void | Promise<void>
  >,
};

export const dDetailsProps = {
  /**
   * Defines id of the component. Used to control open\close state via DAccordion
   */
  id: generateProp.text(),
  /**
   * Plain string or VNode
   */
  summary: generateProp.content(),
  /**
   * Pass any attribute to the summary element
   */
  summaryOptions: generateProp.options<HTMLAttributes>(config.summaryOptions),
  /**
   * Don't show content after the summary
   */
  hideSummaryAfter: Boolean,
  /**
   * Pass true to make the component disabled
   */
  disabled: Boolean,
  /**
   * Plain string or VNode
   */
  content: generateProp.content(),
  /**
   * Pass any attribute to the content element
   */
  contentOptions: generateProp.options<HTMLAttributes>(config.contentOptions),
  /**
   * Defines if the component opened by default
   */
  open: Boolean,
  /**
   * Defines appearance of the component
   */
  colorScheme: generateProp.colorScheme(),
  /**
   * Defines padding type of the component, use 'equal' if the component contains only an icon
   */
  padding: generateProp.padding(),
  /**
   * Defines corner rounding of the component
   */
  rounding: generateProp.rounding(),
  /**
   * Defines size of the component
   */
  size: generateProp.size(),
  /**
   * Defines transition type of the component
   */
  transition: generateProp.transition(),

  /**
   * Alternative way to catch toggle event with current open attr in the payload
   */
  whenToggle: Function as PropType<
    (event: Event, open?: boolean) => void | Promise<void>
  >,
};
