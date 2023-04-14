import colorSchemeStyles from "@darwin-studio/ui-codegen/dist/styles/color-scheme.css?module";
import dAccordionStyles from "./d-accordion.css?module";
import dDetailsStyles from "./d-details.css?module";

export default {
  name: "DAccordion",
  class: dAccordionStyles.dAccordion,
  provideInjectKey: "accordionProvided",
  openIdsInjectionPath: "injection.openIds",

  details: {
    ref: "detailsRef",
    name: "DDetails",
    class: dDetailsStyles.dDetails,
    disabledClass: dDetailsStyles.__disabled,
    disabledColorSchemeClass: colorSchemeStyles.__disabled,
  },

  summaryOptions: {
    class: dDetailsStyles.summary,
  },
  summaryOpenClass: dDetailsStyles.flatBottom,

  summaryAfterOptions: {
    class: dDetailsStyles.summaryAfter,
  },
  summaryAfterOpenClass: dDetailsStyles.rotatedIcon,
  summaryAfterContent: "⛛",

  contentOptions: {
    key: "detailsContent",
    ref: "detailsContentRef",
    class: dDetailsStyles.content,
  },
};
