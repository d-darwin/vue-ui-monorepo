"use strict";
exports.__esModule = true;
exports.LOG_TYPE = void 0;
var chalk = require("chalk");
var PACKAGE_NAME = "DARWIN VUE UI CODEGEN"; // TODO: use package.json ???
exports.LOG_TYPE = {
    INFO: "info",
    ERROR: "error",
    WARN: "warn"
};
function default_1(message, type) {
    if (type === void 0) { type = exports.LOG_TYPE.INFO; }
    switch (type) {
        case exports.LOG_TYPE.INFO:
            console.info(chalk.greenBright("\u2714 [".concat(PACKAGE_NAME, "]: ").concat(message)));
            return;
        case exports.LOG_TYPE.ERROR:
            console.error(chalk.red("\u274C [".concat(PACKAGE_NAME, "]: ").concat(message)));
            return;
        case exports.LOG_TYPE.WARN:
            console.warn(chalk.yellowBright("\u26A0 [".concat(PACKAGE_NAME, "]: ").concat(message)));
    }
}
exports["default"] = default_1;
