"use strict";
exports.__esModule = true;
/**
 * Clean up constantVariantName from prefixes or suffixes
 * @param constantVariantName
 * @param prefixOrPostfixList
 */
function default_1(constantVariantName, prefixOrPostfixList) {
    var nakedVariantName = constantVariantName;
    var nakedPrefixOrSuffixName = "";
    prefixOrPostfixList.some(function (prefixOrSuffix) {
        console.log(constantVariantName, prefixOrSuffix);
        if (constantVariantName.startsWith(prefixOrSuffix)) {
            console.log(1);
            nakedVariantName = constantVariantName.replace("".concat(prefixOrSuffix, "-"), "");
            nakedPrefixOrSuffixName = prefixOrSuffix;
            return true;
        }
        if (constantVariantName.endsWith(prefixOrSuffix)) {
            console.log(2);
            nakedVariantName = constantVariantName.replace("-".concat(prefixOrSuffix), "");
            nakedPrefixOrSuffixName = prefixOrSuffix;
            return true;
        }
        return false;
    });
    return { nakedVariantName: nakedVariantName, nakedPrefixOrSuffixName: nakedPrefixOrSuffixName };
}
exports["default"] = default_1;
