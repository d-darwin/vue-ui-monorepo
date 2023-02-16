"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var config = require("@darwin-studio/ui-codegen/config.json");
var prepareCssClassName_1 = require("../utils/prepareCssClassName");
var writeFile_1 = require("../utils/writeFile");
var getNakedName_1 = require("./getNakedName");
// TODO: descr
// TODO: try to reduce args
function default_1(designTokens, designTokenConfig, tokenNameFilter, cssClassGenerator, colorVariantList) {
    return __awaiter(this, void 0, void 0, function () {
        var cssClassStringList_1, tokenVariantNameList_1, prevClassName_1, prevCustomPropertyName_1, prevCustomPropertyValue_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!designTokens) return [3 /*break*/, 2];
                    cssClassStringList_1 = [];
                    cssClassStringList_1.push("@import '".concat(config.CSS_VARIABLES_SOURCE, "';"));
                    tokenVariantNameList_1 = tokenNameFilter
                        ? tokenNameFilter(Object.keys(designTokens))
                        : Object.keys(designTokens);
                    prevClassName_1 = '';
                    prevCustomPropertyName_1 = '';
                    prevCustomPropertyValue_1 = '';
                    tokenVariantNameList_1 === null || tokenVariantNameList_1 === void 0 ? void 0 : tokenVariantNameList_1.forEach(function (tokenVariantName, index) {
                        var _a;
                        var className = (0, prepareCssClassName_1["default"])(designTokenConfig.CSS_CLASS_PREFIX, tokenVariantName);
                        var customPropertyName = "--".concat(designTokenConfig.NAME, "-").concat(tokenVariantName);
                        var customPropertyValue = (_a = designTokens[tokenVariantName]) === null || _a === void 0 ? void 0 : _a.value;
                        if (colorVariantList === null || colorVariantList === void 0 ? void 0 : colorVariantList.length) {
                            var colorVariantName = (0, getNakedName_1["default"])(customPropertyName, colorVariantList).extractedWord;
                            var colorCustomPropertyName = "--".concat(config.TOKENS.COLOR_SCHEME.NAME, "-").concat(colorVariantName, "-").concat(designTokenConfig.NAME);
                            cssClassStringList_1.push(cssClassGenerator(className, { name: customPropertyName, value: customPropertyValue }, prevClassName_1, { name: colorCustomPropertyName })); // TODO: add options{}
                            return;
                        }
                        else {
                            cssClassStringList_1.push(cssClassGenerator(className, { name: customPropertyName, value: customPropertyValue }, prevClassName_1, { name: prevCustomPropertyName_1, value: prevCustomPropertyValue_1 }, index === tokenVariantNameList_1.length - 1)); // TODO: add options{}
                        }
                        prevClassName_1 = className;
                        prevCustomPropertyName_1 = customPropertyName;
                        prevCustomPropertyValue_1 = customPropertyValue;
                    });
                    return [4 /*yield*/, (0, writeFile_1["default"])(cssClassStringList_1, config.OUT_DIR + designTokenConfig.CSS_FILE_PATH + config.STYLES_FILE_EXT)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
exports["default"] = default_1;
