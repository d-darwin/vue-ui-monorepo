"use strict";
exports.__esModule = true;
// TODO: descr
function default_1(className, customProperty) {
    // TODO: move \n to the caller
    return "\n.".concat(className, " {\n  padding: var(").concat(customProperty.name, ");\n  --padding: var(").concat(customProperty.name, ");\n}");
}
exports["default"] = default_1;
