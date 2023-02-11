"use strict";
exports.__esModule = true;
// TODO: descr
function default_1(className, sizeCustomPropertyName) {
    // TODO: move \n to the caller
    // TODO: check if min-... is appropriate
    return "\n.".concat(className, " {\n  min-height: var(").concat(sizeCustomPropertyName, ");\n  min-width: var(").concat(sizeCustomPropertyName, ");\n  --size: var(").concat(sizeCustomPropertyName, ");\n}");
}
exports["default"] = default_1;
