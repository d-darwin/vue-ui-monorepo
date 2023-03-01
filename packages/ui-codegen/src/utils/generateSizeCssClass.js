"use strict";
exports.__esModule = true;
// TODO: descr
function default_1(className, customProperty) {
    // TODO: move \n to the caller
    // TODO: check if min-... is appropriate
    return "\n.".concat(className, " {\n  min-height: var(").concat(customProperty.name, ");\n  min-width: var(").concat(customProperty.name, ");\n  --size: var(").concat(customProperty.name, ");\n}");
}
exports["default"] = default_1;
