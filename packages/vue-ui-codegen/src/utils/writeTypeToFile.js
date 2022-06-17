"use strict";
exports.__esModule = true;
var fs = require("fs");
var log_1 = require("./log");
// TODO: generalize with other write functions
function default_1(constantStrings, filePath) {
    if (constantStrings.length) {
        var sizeFileStream_1 = fs.createWriteStream(filePath);
        sizeFileStream_1.on("open", function () {
            constantStrings.forEach(function (classStrings, classIndex) {
                sizeFileStream_1.write("".concat(classStrings, "\n"));
                if (classIndex >= constantStrings.length - 1) {
                    sizeFileStream_1.end();
                }
            });
        });
        sizeFileStream_1.on("error", function (error) {
            (0, log_1["default"])(error.message, log_1.LOG_TYPE.ERROR);
        });
    }
}
exports["default"] = default_1;
