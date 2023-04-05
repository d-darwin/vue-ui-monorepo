import { HTMLAttributes, PropType, VNode } from "vue";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import {
  CONTENT_DEFAULTS,
  SUMMARY_DEFAULTS,
} from "@darwin-studio/vue-ui/src/components/molecules/d-accordion/constants";

export const dDetailsProps = {
  /**
   * Plain string or VNode
   */
  summary: generateProp.content(),
  /**
   * Pass any attribute to the summary element
   */
  summaryOptions: generateProp.options<HTMLAttributes>(SUMMARY_DEFAULTS),
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
  contentOptions: generateProp.options<HTMLAttributes>(CONTENT_DEFAULTS),
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

export const dAccordionProps = {
  /**
   * An array of VNodes (DDetails supposed)
   */
  content: {
    type: Array as PropType<(VNode | undefined)[]>, // TODO: specify type ???
  },
  // TODO: specific props: isSolo, someOpen

  // TODO: how to pas to the children properly???
  //  hideSummaryAfter
  //  openId\Value ???
  // TODO: common props
  //  colorScheme
  //  padding
  //  rounding
  //  size
  //  transition
  /**
   * Defines container element type of the component
   */
  tag: generateProp.tag(),

  // TODO: whenChange ???
};
