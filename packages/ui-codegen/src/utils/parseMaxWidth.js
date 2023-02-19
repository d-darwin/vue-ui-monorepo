"use strict";
exports.__esModule = true;
// TODO: descr
function default_1(rawString) {
    if (!rawString) {
        return;
    }
    var _a = rawString.split(':'), name = _a[0], value = _a[1];
    if (name && name === "max-width" && value) {
        return value;
    }
}
exports["default"] = default_1;
