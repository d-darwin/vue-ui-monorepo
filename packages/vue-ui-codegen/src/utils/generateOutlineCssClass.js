"use strict";
exports.__esModule = true;
// TODO: naming ???
function default_1(className, customPropertyName, colorCustomPropertyName) {
    // TODO: add .${className}[data-focus-visible-added] ???
    // TODO: different outline colors for hover/active/disabled???
    // TODO: move \n to the caller
    if (colorCustomPropertyName) {
        return "\n.".concat(className, ":focus-visible {\n  outline: var(").concat(customPropertyName, ") var(").concat(colorCustomPropertyName, ");\n}");
    }
    // TODO: move \n to the caller
    return "\n.".concat(className, ":focus-visible {\n  outline: var(").concat(customPropertyName, ");\n}");
}
exports["default"] = default_1;
