const StyleDictionary = require("style-dictionary").extend("config.json");
const transformSizePixel = require("./transforms/size-pixel");
const transformSpacingPixel = require("./transforms/spacing-pixel");
const transformRadiusPixel = require("./transforms/radius-pixel");
const transformBorderPixelStyleColor = require("./transforms/border-pixel-style");
const transformFontString = require("./transforms/font-string");
const transformMotion = require("./transforms/motion");

StyleDictionary.registerTransform(transformSizePixel);
StyleDictionary.registerTransform(transformSpacingPixel);
StyleDictionary.registerTransform(transformRadiusPixel);
StyleDictionary.registerTransform(transformBorderPixelStyleColor);
StyleDictionary.registerTransform(transformFontString);
StyleDictionary.registerTransform(transformMotion);

StyleDictionary.buildAllPlatforms();
