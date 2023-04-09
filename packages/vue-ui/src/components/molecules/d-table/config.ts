import styles from "./index.css?module";

export default {
  name: "DTable",
  className: "dTable",
  rowClassName: "row",
  loaderOptions: {
    class: styles["loader"],
    fillAvailable: true,
  },
} as const;
