"use strict";
exports.__esModule = true;
var fs = require("fs");
var config = require("../../config.json");
var log_1 = require("./log");
function default_1(fileClassStrings, filePath) {
    if (fileClassStrings.length) {
        var sizeFileStream_1 = fs.createWriteStream(filePath);
        sizeFileStream_1.on("open", function () {
            sizeFileStream_1.write("@import '".concat(config.CSS_VARIABLES_SOURCE, "';\n"));
            fileClassStrings.forEach(function (classStrings, classIndex) {
                sizeFileStream_1.write("\n".concat(classStrings, "\n"));
                if (classIndex >= fileClassStrings.length - 1) {
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
