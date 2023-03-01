const StyleDictionary = require("style-dictionary").extend("config.json");

const transformGridColumn = require("./transforms/grid/column-count");
const transformGridColumnName = require("./transforms/grid/column-count-name");

const transformBorderPixelStyle = require("./transforms/border-pixel-style");
const transformBreakpoint = require("./transforms/breakpoint");
const transformFontString = require("./transforms/font-string");
const transformMotion = require("./transforms/motion");
const transformRadiusPixel = require("./transforms/radius-pixel");
const transformSizePixel = require("./transforms/size-pixel");
const transformSpacingPixel = require("./transforms/spacing-pixel");

StyleDictionary.registerTransform(transformGridColumn);
StyleDictionary.registerTransform(transformGridColumnName);

StyleDictionary.registerTransform(transformBorderPixelStyle);
StyleDictionary.registerTransform(transformBreakpoint);
StyleDictionary.registerTransform(transformFontString);
StyleDictionary.registerTransform(transformMotion);
StyleDictionary.registerTransform(transformRadiusPixel);
StyleDictionary.registerTransform(transformSizePixel);
StyleDictionary.registerTransform(transformSpacingPixel);

StyleDictionary.buildAllPlatforms();
