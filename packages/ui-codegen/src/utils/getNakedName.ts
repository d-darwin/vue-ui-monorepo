/**
 * Clean up constantVariantName from prefixes or suffixes
 * @param tokenVariantName
 * @param extractionWordList
 */
export default function(
  tokenVariantName: string,
  extractionWordList: string[]
): { nakedVariantName: string; extractedWord: string } {
  let nakedVariantName = tokenVariantName;
  let extractedWord = "";

  extractionWordList.some((word) => {
    if (tokenVariantName.startsWith(word)) {
      nakedVariantName = tokenVariantName.replace(`${word}-`, "");
      extractedWord = word;
      return true;
    }
    if (tokenVariantName.endsWith(word)) {
      nakedVariantName = tokenVariantName.replace(`-${word}`, "");
      extractedWord = word;
      return true;
    }
    if (tokenVariantName.includes(word)) {
      nakedVariantName = tokenVariantName.replace(`-${word}-`, "");
      extractedWord = word;
      return true;
    }
    return false;
  });

  return { nakedVariantName, extractedWord };
}
