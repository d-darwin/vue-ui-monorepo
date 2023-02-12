"use strict";
exports.__esModule = true;
// TODO: descr
function default_1(className, customPropertyName) {
    // TODO: move \n to the caller
    // TODO: check if min-... is appropriate
    return "\n.".concat(className, " {\n  min-height: var(").concat(customPropertyName, ");\n  min-width: var(").concat(customPropertyName, ");\n  --size: var(").concat(customPropertyName, ");\n}");
}
exports["default"] = default_1;
