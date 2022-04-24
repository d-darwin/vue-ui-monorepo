export default function(constantVariantName: string): string {
  const hasProhibitedChars =
    constantVariantName.includes("-") || constantVariantName.includes(" "); // TODO: do it more accurate

  const constantVariantKey = hasProhibitedChars
    ? `"${constantVariantName}"`
    : constantVariantName;

  return `  ${constantVariantKey.toUpperCase()}: "${constantVariantName}",`;
}
