import dAccordionStyles from "./d-accordion.css";
import dDetailsStyles from "./d-details.css";

export default {
  name: "DAccordion",
  class: dAccordionStyles["dAccordion"],
  details: {
    ref: "detailsRef",
    name: "DDetails",
    class: dDetailsStyles["dDetails"],
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
