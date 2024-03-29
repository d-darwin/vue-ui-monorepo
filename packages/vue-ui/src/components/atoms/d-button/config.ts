import styles from "./index.css?module";

export default {
  name: "DButton",
  class: styles["dButton"],
  loaderOptions: {
    key: "loader",
    class: styles["loader"],
  },
  buttonTag: "button",
  routerLinkTag: "router-link",
  linkTag: "a",
} as const;
