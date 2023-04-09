import colorSchemeStyles from "@darwin-studio/ui-codegen/dist/styles/color-scheme.css?module";
import dAccordionStyles from "./d-accordion.css";
import dDetailsStyles from "./d-details.css";

export default {
  name: "DAccordion",
  class: dAccordionStyles["dAccordion"],
  details: {
    ref: "detailsRef",
    name: "DDetails",
    class: dDetailsStyles["dDetails"],
    disabledClass: dDetailsStyles["__disabled"], // TODO: use or remove
    disabledColorSchemeClass: colorSchemeStyles["__disabled"],
  },
  summaryOptions: {
    class: dDetailsStyles["summary"],
  },
  summaryIcon: "⛛",
  summaryAfterClass: dDetailsStyles["summaryAfter"],
  contentOptions: {
    key: "detailsContent",
    ref: "detailsContentRef",
    class: dDetailsStyles["content"],
  },
  provideInjectKey: "commonProps",
} as const;
