import * as chalk from "chalk";

const PACKAGE_NAME = "DARWIN VUE UI CODEGEN"; // TODO: use package.json ???

export const LOG_TYPE = {
  INFO: "info",
  ERROR: "error",
  WARN: "warn"
} as const;

type LogType = (typeof LOG_TYPE)[keyof typeof LOG_TYPE];

// TODO: descr
export default function(message: string, type: LogType = LOG_TYPE.INFO): void {
  switch (type) {
    case LOG_TYPE.INFO:
      console.info(chalk.greenBright(`✔ [${PACKAGE_NAME}]: ${message}`));
      return;
    case LOG_TYPE.ERROR:
      console.error(chalk.red(`❌ [${PACKAGE_NAME}]: ${message}`));
      return;
    case LOG_TYPE.WARN:
      console.warn(chalk.yellowBright(`⚠ [${PACKAGE_NAME}]: ${message}`));
  }
}
