"use strict";
exports.__esModule = true;
var constants_1 = require("./src/generators/constants");
var types_1 = require("./src/generators/types");
var styles_1 = require("./src/generators/styles");
var log_1 = require("./src/utils/log");
(0, constants_1["default"])().then(function () { return (0, log_1["default"])("Constants were generated"); });
(0, types_1["default"])().then(function () { return (0, log_1["default"])("Types were generated"); });
(0, styles_1["default"])().then(function () { return (0, log_1["default"])("Styles were generated"); });
