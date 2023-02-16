"use strict";
exports.__esModule = true;
// TODO: naming ???
function default_1(className, customProperty, prevClassName, colorCustomProperty) {
    // TODO: add .${className}[data-focus-visible-added] ???
    // TODO: different outline colors for hover/active/disabled???
    // TODO: move \n to the caller
    if (colorCustomProperty === null || colorCustomProperty === void 0 ? void 0 : colorCustomProperty.name) {
        return "\n.".concat(className, ":focus-visible {\n  outline: var(").concat(customProperty.name, ") var(").concat(colorCustomProperty.name, ");\n}");
    }
    // TODO: move \n to the caller
    return "\n.".concat(className, ":focus-visible {\n  outline: var(").concat(customProperty.name, ");\n}");
}
exports["default"] = default_1;
