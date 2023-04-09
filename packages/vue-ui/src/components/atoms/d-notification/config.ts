import styles from "./index.css?module";

export default {
  name: "DNotification",
  class: styles["dNotification"], // TODO: add style existence check
  target: "body",
  duration: 5,
  role: "alert",
} as const;
