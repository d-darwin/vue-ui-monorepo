"use strict";
exports.__esModule = true;
var fs = require("fs");
var log_1 = require("./log");
// TODO: generalize with other write functions
function default_1(fileStringList, filePath) {
    if (fileStringList.length) {
        var fileStream_1 = fs.createWriteStream(filePath);
        fileStream_1.on("open", function () {
            fileStringList.forEach(function (fileString, index) {
                fileStream_1.write("".concat(fileString, "\n"));
                if (index >= fileStringList.length - 1) {
                    fileStream_1.end();
                }
            });
        });
        fileStream_1.on("error", function (error) {
            (0, log_1["default"])(error.message, log_1.LOG_TYPE.ERROR);
        });
    }
}
exports["default"] = default_1;
