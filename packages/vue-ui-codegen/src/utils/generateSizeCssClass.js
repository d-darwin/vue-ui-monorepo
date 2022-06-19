"use strict";
exports.__esModule = true;
// TODO: descr
function default_1(className, sizeCustomPropertyName) {
    // TODO: check if min-... is appropriate
    return "\n.".concat(className, " {\n  min-height: var(").concat(sizeCustomPropertyName, ");\n  min-width: var(").concat(sizeCustomPropertyName, ");\n}");
}
exports["default"] = default_1;
