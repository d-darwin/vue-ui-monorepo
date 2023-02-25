"use strict";
exports.__esModule = true;
// TODO: descr
function default_1(constantVariantName, constantVariantValue) {
    return "  ".concat(constantVariantName.replace("-", "_").toUpperCase(), ": \"").concat(constantVariantValue || constantVariantName, "\",");
}
exports["default"] = default_1;
