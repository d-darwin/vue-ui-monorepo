"use strict";
exports.__esModule = true;
/**
 * Clean up constantVariantName from prefixes or suffixes
 * @param tokenVariantName
 * @param extractionWordList
 */
function default_1(tokenVariantName, extractionWordList) {
    var nakedVariantName = tokenVariantName;
    var extractedWord = "";
    extractionWordList.some(function (word) {
        if (tokenVariantName.startsWith(word)) {
            nakedVariantName = tokenVariantName.replace("".concat(word, "-"), "");
            extractedWord = word;
            return true;
        }
        if (tokenVariantName.endsWith(word)) {
            nakedVariantName = tokenVariantName.replace("-".concat(word), "");
            extractedWord = word;
            return true;
        }
        if (tokenVariantName.includes(word)) {
            nakedVariantName = tokenVariantName.replace("-".concat(word, "-"), "");
            extractedWord = word;
            return true;
        }
        return false;
    });
    return { nakedVariantName: nakedVariantName, extractedWord: extractedWord };
}
exports["default"] = default_1;
