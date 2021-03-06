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
var config = require("@darwin-studio/vue-ui-codegen/config.json");
var log_1 = require("../utils/log");
var generateTypesFile_1 = require("../utils/generateTypesFile");
exports["default"] = (function () { return __awaiter(void 0, void 0, void 0, function () {
    var designTokens, _a, colorSchemeTokenConfig, fontTokenConfig, paddingTokenConfig, roundingTokenConfig, sizeTokenConfig, transitionTokenConfig;
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
                colorSchemeTokenConfig = config.TOKENS.COLOR_SCHEME;
                return [4 /*yield*/, (0, generateTypesFile_1["default"])(designTokens[colorSchemeTokenConfig.NAME], colorSchemeTokenConfig)];
            case 4:
                _b.sent();
                fontTokenConfig = config.TOKENS.FONT;
                return [4 /*yield*/, (0, generateTypesFile_1["default"])(designTokens[fontTokenConfig.NAME], fontTokenConfig)];
            case 5:
                _b.sent();
                paddingTokenConfig = config.TOKENS.PADDING;
                return [4 /*yield*/, (0, generateTypesFile_1["default"])(designTokens[paddingTokenConfig.NAME], paddingTokenConfig)];
            case 6:
                _b.sent();
                roundingTokenConfig = config.TOKENS.ROUNDING;
                return [4 /*yield*/, (0, generateTypesFile_1["default"])(designTokens[roundingTokenConfig.NAME], roundingTokenConfig)];
            case 7:
                _b.sent();
                sizeTokenConfig = config.TOKENS.SIZE;
                return [4 /*yield*/, (0, generateTypesFile_1["default"])(designTokens[sizeTokenConfig.NAME], sizeTokenConfig)];
            case 8:
                _b.sent();
                transitionTokenConfig = config.TOKENS.TRANSITION;
                return [4 /*yield*/, (0, generateTypesFile_1["default"])(designTokens[transitionTokenConfig.NAME], transitionTokenConfig)];
            case 9:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
