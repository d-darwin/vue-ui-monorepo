"use strict";
exports.__esModule = true;
// TODO: descr
function default_1(className, customPropertyName) {
    // TODO: move \n to the caller
    return "\n.".concat(className, " {\n  color: var(").concat(customPropertyName, ");\n  background-color: var(").concat(customPropertyName, "-background);\n}\n\n.").concat(className, ":hover {\n  color: var(").concat(customPropertyName, "-hover);\n  background-color: var(").concat(customPropertyName, "-background-hover);\n}\n\n.").concat(className, ":active\n.").concat(className, ".__active {\n  color: var(").concat(customPropertyName, "-active);\n  background-color: var(").concat(customPropertyName, "-background-active);\n}\n\n.").concat(className, ":disabled,\n.").concat(className, ".__disabled {\n  color: var(").concat(customPropertyName, "-disabled);\n  background-color: var(").concat(customPropertyName, "-background-disabled);\n}");
}
exports["default"] = default_1;
