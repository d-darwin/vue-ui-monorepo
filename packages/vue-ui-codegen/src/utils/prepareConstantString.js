"use strict";
exports.__esModule = true;
function default_1(constantVariantName) {
    var hasProhibitedChars = constantVariantName.includes("-") || constantVariantName.includes(" "); // TODO: do it more accurate
    var constantVariantKey = hasProhibitedChars
        ? "\"".concat(constantVariantName, "\"")
        : constantVariantName;
    return "  ".concat(constantVariantKey.toUpperCase(), ": \"").concat(constantVariantName, "\",");
}
exports["default"] = default_1;
