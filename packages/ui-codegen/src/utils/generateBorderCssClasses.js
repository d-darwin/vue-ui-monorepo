"use strict";
exports.__esModule = true;
// TODO: descr
function default_1(className, customProperty, prevClassName, colorCustomProperty) {
    // TODO: move \n to the caller
    if (colorCustomProperty === null || colorCustomProperty === void 0 ? void 0 : colorCustomProperty.name) {
        return "\n.".concat(className, " {\n  border: var(").concat(customProperty.name, ") var(").concat(colorCustomProperty.name, ");\n}\n\n.").concat(className, ":hover {\n  border-color: var(").concat(colorCustomProperty.name, "-hover);\n}\n\n.").concat(className, ":active {\n  border-color: var(").concat(colorCustomProperty.name, "-active);\n}\n\n.").concat(className, ":disabled {\n  border-color: var(").concat(colorCustomProperty.name, "-disabled);\n}");
    }
    // TODO: move \n to the caller
    return "\n.".concat(className, " {\n  border: var(").concat(customProperty.name, ");\n}");
}
exports["default"] = default_1;
