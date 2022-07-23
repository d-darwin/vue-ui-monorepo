"use strict";
exports.__esModule = true;
var camel_case_1 = require("camel-case");
var capitalizeFirstLetter_1 = require("./capitalizeFirstLetter");
/**
 * Prepare class name
 * @param tokenTypeName
 * @param tokenVariantName
 */
function default_1(tokenTypeName, tokenVariantName) {
    if (!tokenTypeName || !tokenVariantName) {
        return '';
    }
    return "".concat(tokenTypeName).concat((0, capitalizeFirstLetter_1["default"])((0, camel_case_1.camelCase)(tokenVariantName)));
}
exports["default"] = default_1;
