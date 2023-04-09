import styles from "./index.css?module";

export default {
  name: "DLink",
  class: styles["dLink"],
  routerLinkTag: "router-link",
  linkTag: "a",
} as const;
