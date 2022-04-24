const StyleDictionary = require("style-dictionary").extend("config.json");
const transformFontString = require("./transforms/font-string");

StyleDictionary.registerTransform(transformFontString);

StyleDictionary.buildAllPlatforms();
