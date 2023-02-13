"use strict";
exports.__esModule = true;
// TODO: descr
function default_1(className, customProperty) {
    // TODO: move \n to the caller ??
    return "\n.".concat(className, " {\n  color: var(").concat(customProperty.name, ");\n  background-color: var(").concat(customProperty.name, "-background);\n  --color: var(").concat(customProperty.name, ");\n  --background-color: var(").concat(customProperty.name, "-background);\n}\n\n.").concat(className, ":hover {\n  color: var(").concat(customProperty.name, "-hover);\n  background-color: var(").concat(customProperty.name, "-background-hover);\n  --color: var(").concat(customProperty.name, "-hover);\n  --background-color: var(").concat(customProperty.name, "-background-hover);\n}\n\n.").concat(className, ":active,\n.").concat(className, ".__active {\n  color: var(").concat(customProperty.name, "-active);\n  background-color: var(").concat(customProperty.name, "-background-active);\n  --color: var(").concat(customProperty.name, "-active);\n  --background-color: var(").concat(customProperty.name, "-background-active);\n}\n\n.").concat(className, ":disabled,\n.").concat(className, ".__disabled {\n  color: var(").concat(customProperty.name, "-disabled);\n  background-color: var(").concat(customProperty.name, "-background-disabled);\n  --color: var(").concat(customProperty.name, "-disabled);\n  --background-color: var(").concat(customProperty.name, "-background-disabled);\n}");
}
exports["default"] = default_1;
