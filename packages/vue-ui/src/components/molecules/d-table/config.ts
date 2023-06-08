import styles from "./index.css?module";

export default {
  name: "DTable",
  class: styles["dTable"],
  rowClass: styles["row"],
  loaderOptions: {
    fillAvailable: true,
    class: styles["loader"],
  },
} as const;
