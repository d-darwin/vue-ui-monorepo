import dDetailsStyles from "./d-details.css";

export default {
  name: "DAccordion",
  class: "dAccordion",
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
    class: dDetailsStyles["detailsContent"],
  },
  provideInjectKey: "commonProps",
} as const;
