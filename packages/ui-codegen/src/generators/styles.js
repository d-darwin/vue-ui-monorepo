"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var log_1 = require("../utils/log");
var generateStylesFile_1 = require("../utils/generateStylesFile");
var generateBorderCssClasses_1 = require("../utils/generateBorderCssClasses");
var generateColorSchemeCssClasses_1 = require("../utils/generateColorSchemeCssClasses");
var generateFontCssClass_1 = require("../utils/generateFontCssClass");
var generateMinControlWidthCssClass_1 = require("../utils/generateMinControlWidthCssClass");
var generateOutlineCssClass_1 = require("../utils/generateOutlineCssClass");
var generatePaddingCssClass_1 = require("../utils/generatePaddingCssClass");
var generateRoundingCssClass_1 = require("../utils/generateRoundingCssClass");
var generateSizeCssClass_1 = require("../utils/generateSizeCssClass");
var color_scheme_1 = require("../../dist/constants/color-scheme");
var generateTransitionCssClass_1 = require("../utils/generateTransitionCssClass");
var generateGridCssClasses_1 = require("../utils/generateGridCssClasses");
var parseMaxWidth_1 = require("../utils/parseMaxWidth");
exports["default"] = (function () { return __awaiter(void 0, void 0, void 0, function () {
    var designTokens, _a, borderTokenConfig, colorSchemeTokenConfig, fontTokenConfig, minControlWidthConfig, outlineTokenConfig, paddingTokenConfig, roundingTokenConfig, sizeTokenConfig, transitionTokenConfig, gridTokenConfig, gridTokens, breakpointTokenConfig, breakpointTokens, preparedGridTokens;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Promise.resolve().then(function () { return require(config.DESIGN_TOKENS_SOURCE); })];
            case 1:
                designTokens = _b.sent();
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                (0, log_1["default"])("Can't import design tokens from DESIGN_TOKENS_SOURCE. Check config.json", log_1.LOG_TYPE.ERROR);
                return [2 /*return*/];
            case 3:
                borderTokenConfig = config.TOKENS.BORDER;
                return [4 /*yield*/, (0, generateStylesFile_1["default"])(designTokens[borderTokenConfig.NAME], borderTokenConfig, null, // TODO: move to config ???
                    generateBorderCssClasses_1["default"], // TODO: move to config ???
                    Object.values(color_scheme_1.COLOR_SCHEME))
                    // TODO: separate styles for background/color ???
                    // TODO: what to do with 'text' ???
                ];
            case 4:
                _b.sent();
                colorSchemeTokenConfig = config.TOKENS.COLOR_SCHEME;
                return [4 /*yield*/, (0, generateStylesFile_1["default"])(designTokens[colorSchemeTokenConfig.NAME], colorSchemeTokenConfig, 
                    // TODO: move to config ???
                    function (designTokenNames) { return designTokenNames.filter(function (designTokenName) {
                        var isIgnored = (colorSchemeTokenConfig.IGNORE || []).some(function (ignoredSubstring) {
                            return designTokenName.includes(ignoredSubstring);
                        });
                        return !designTokenName.includes('-') && !isIgnored;
                    }); }, generateColorSchemeCssClasses_1["default"])];
            case 5:
                _b.sent();
                fontTokenConfig = config.TOKENS.FONT;
                return [4 /*yield*/, (0, generateStylesFile_1["default"])(designTokens[fontTokenConfig.NAME], fontTokenConfig, null, // TODO: move to config ???
                    generateFontCssClass_1["default"])];
            case 6:
                _b.sent();
                minControlWidthConfig = config.TOKENS.MIN_CONTROL_WIDTH;
                return [4 /*yield*/, (0, generateStylesFile_1["default"])(designTokens[minControlWidthConfig.NAME], minControlWidthConfig, null, generateMinControlWidthCssClass_1["default"])];
            case 7:
                _b.sent();
                outlineTokenConfig = config.TOKENS.OUTLINE;
                return [4 /*yield*/, (0, generateStylesFile_1["default"])(designTokens[outlineTokenConfig.NAME], outlineTokenConfig, null, // TODO: move to config ???
                    generateOutlineCssClass_1["default"], // TODO: move to config ???
                    Object.values(color_scheme_1.COLOR_SCHEME))];
            case 8:
                _b.sent();
                paddingTokenConfig = config.TOKENS.PADDING;
                return [4 /*yield*/, (0, generateStylesFile_1["default"])(designTokens[paddingTokenConfig.NAME], paddingTokenConfig, null, // TODO: move to config ???
                    generatePaddingCssClass_1["default"])];
            case 9:
                _b.sent();
                roundingTokenConfig = config.TOKENS.ROUNDING;
                return [4 /*yield*/, (0, generateStylesFile_1["default"])(designTokens[roundingTokenConfig.NAME], roundingTokenConfig, null, // TODO: move to config ???
                    generateRoundingCssClass_1["default"])];
            case 10:
                _b.sent();
                sizeTokenConfig = config.TOKENS.SIZE;
                return [4 /*yield*/, (0, generateStylesFile_1["default"])(designTokens[sizeTokenConfig.NAME], sizeTokenConfig, function (designTokenNames) { return designTokenNames.filter(function (designTokenName) { return !designTokenName.includes('-'); } // TODO: more flexible filter
                    ); }, // TODO: move to config ???
                    generateSizeCssClass_1["default"])];
            case 11:
                _b.sent();
                transitionTokenConfig = config.TOKENS.TRANSITION;
                return [4 /*yield*/, (0, generateStylesFile_1["default"])(designTokens[transitionTokenConfig.NAME], transitionTokenConfig, null, // TODO: move to config ???
                    generateTransitionCssClass_1["default"])
                    // TODO: Generates max grid width :arrow_down:
                ];
            case 12:
                _b.sent();
                gridTokenConfig = config.TOKENS.GRID;
                gridTokens = designTokens[gridTokenConfig.NAME];
                breakpointTokenConfig = config.TOKENS.BREAKPOINT;
                breakpointTokens = designTokens[breakpointTokenConfig.NAME];
                preparedGridTokens = {};
                Object.keys(gridTokens).forEach(function (breakpointName) {
                    var _a;
                    var gridToken = gridTokens[breakpointName];
                    if (!gridToken) {
                        return;
                    }
                    preparedGridTokens[breakpointName] = __assign(__assign({}, gridToken), { value: __assign(__assign({}, gridToken === null || gridToken === void 0 ? void 0 : gridToken.value), { breakpoint: (_a = breakpointTokens[breakpointName]) === null || _a === void 0 ? void 0 : _a.value, maxWidth: (0, parseMaxWidth_1["default"])(gridToken.description) }) });
                });
                return [4 /*yield*/, (0, generateStylesFile_1["default"])(preparedGridTokens, gridTokenConfig, null, // TODO: move to config ???
                    generateGridCssClasses_1["default"])];
            case 13:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
