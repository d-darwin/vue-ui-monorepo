"use strict";
exports.__esModule = true;
// TODO: descr
function default_1(className, customProperty, prevClassName, prevCustomProperty, isLast) {
    if (!prevCustomProperty || typeof prevCustomProperty.value !== "object" || typeof customProperty.value !== "object") {
        return '';
    }
    var prevGridClassStrings = "  :root {\n    --grid-column-count: var(".concat(prevCustomProperty.name, "-column-count);\n    --grid-column-gap: var(").concat(prevCustomProperty.name, "-column-gap);\n    --grid-column-offset: var(").concat(prevCustomProperty.name, "-column-offset);\n    --grid-max-width: var(").concat(prevCustomProperty.name, "-max-width);\n  }");
    if (isLast) {
        var gridClassStrings = "  :root {\n    --grid-column-count: var(".concat(customProperty.name, "-column-count);\n    --grid-column-gap: var(").concat(customProperty.name, "-column-gap);\n    --grid-column-offset: var(").concat(customProperty.name, "-column-offset);\n    --grid-max-width: var(").concat(customProperty.name, "-max-width);\n  }");
        return "\n@media (min-width: ".concat(prevCustomProperty.value.breakpoint, "px) and (max-width: calc(").concat(customProperty.value.breakpoint, "px - 1px)) {\n").concat(prevGridClassStrings, "\n}\n\n@media (min-width: ").concat(customProperty.value.breakpoint, "px) {\n").concat(gridClassStrings, "\n}");
    }
    return "\n@media (min-width: ".concat(prevCustomProperty.value.breakpoint, "px) and (max-width: calc(").concat(customProperty.value.breakpoint, "px - 1px)) {\n").concat(prevGridClassStrings, "\n}");
}
exports["default"] = default_1;
