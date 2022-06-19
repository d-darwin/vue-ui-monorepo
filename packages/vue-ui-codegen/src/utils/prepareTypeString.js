"use strict";
exports.__esModule = true;
// TODO: descr
function default_1(typeName, constantName) {
    return "export type ".concat(typeName, " = (typeof ").concat(constantName, ")[keyof typeof ").concat(constantName, "];");
}
exports["default"] = default_1;
