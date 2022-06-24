"use strict";
exports.__esModule = true;
// TODO: descr
function default_1(className, customPropertyName, colorCustomPropertyName) {
    // TODO: move \n to the caller
    if (colorCustomPropertyName) {
        return "\n.".concat(className, " {\n  border: var(").concat(customPropertyName, ") var(").concat(colorCustomPropertyName, ");\n}\n\n.").concat(className, ":hover {\n  border-color: var(").concat(colorCustomPropertyName, "-hover);\n}\n\n.").concat(className, ":active {\n  border-color: var(").concat(colorCustomPropertyName, "-active);\n}\n\n.").concat(className, ":disabled {\n  border-color: var(").concat(colorCustomPropertyName, "-disabled);\n}");
    }
    // TODO: move \n to the caller
    return "\n.".concat(className, " {\n  border: var(").concat(customPropertyName, ");\n}");
}
exports["default"] = default_1;
