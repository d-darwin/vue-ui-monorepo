export default function(constantVariantName: string): string {
  return `  ${constantVariantName.replace("-", "_").toUpperCase()}: "${constantVariantName}",`;
}
