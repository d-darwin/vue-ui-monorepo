import styles from "./index.css?module";

export default {
  name: "DGrid",
  class: styles["dGrid"],
  childClass: styles["child"],
  colSpan: 1,
  rowGap: "var(--grid-column-gap)",
};
