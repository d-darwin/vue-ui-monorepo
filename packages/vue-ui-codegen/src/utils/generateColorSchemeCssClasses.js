"use strict";
exports.__esModule = true;
// TODO: descr
function default_1(className, customPropertyName) {
    // TODO: move \n to the caller
    // TODO: different outline colors for hover/active/disabled???
    return "\n.".concat(className, " {\n  color: var(").concat(customPropertyName, ");\n  background-color: var(").concat(customPropertyName, "-background);\n  border-color: var(").concat(customPropertyName, "-border);\n  outline-color: var(").concat(customPropertyName, "-outline);\n}\n\n.").concat(className, ":hover {\n  color: var(").concat(customPropertyName, "-hover);\n  background-color: var(").concat(customPropertyName, "-background-hover);\n  border-color: var(").concat(customPropertyName, "-border-hover);\n}\n\n.").concat(className, ":active {\n  color: var(").concat(customPropertyName, "-active);\n  background-color: var(").concat(customPropertyName, "-background-active);\n  border-color: var(").concat(customPropertyName, "-border-active);\n}\n\n.").concat(className, ":disabled {\n  color: var(").concat(customPropertyName, "-disabled);\n  background-color: var(").concat(customPropertyName, "-background-disabled);\n  border-color: var(").concat(customPropertyName, "-border-disabled);\n}");
}
exports["default"] = default_1;
