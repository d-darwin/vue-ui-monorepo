"use strict";
exports.__esModule = true;
// TODO: naming ???
function default_1(className, customPropertyName) {
    // TODO: move \n to the caller
    return "\n.".concat(className, ":focus-visible,\n.").concat(className, "[data-focus-visible-added] {\n  outline: var(").concat(customPropertyName, ");\n}");
}
exports["default"] = default_1;
