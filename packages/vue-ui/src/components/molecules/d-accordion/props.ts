import { HTMLAttributes, PropType } from "vue";
import DDetails from "@darwin-studio/vue-ui/src/components/molecules/d-accordion/d-details";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import config from "./config";

/**
 * @prop colorScheme
 * TODO: check if there is jsdoc -> storybook
 * */
export const dAccordionProps = {
  /**
   * An array of DDetails
   */
  content: {
    type: Array as PropType<(typeof DDetails | undefined)[]>,
  },

  // TODO: specific props: isSolo, someOpen
  // TODO: openId\Value ???

  /**
   * Don't show content after the summary
   */
  hideSummaryAfter: Boolean,
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

  // TODO: whenChange ???
};

export const dDetailsProps = {
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
