// TODO: descr
export default function(constantVariantName: string, constantVariantValue?: string): string {
  return `  ${constantVariantName.replace("-", "_").toUpperCase()}: "${constantVariantValue || constantVariantName}",`;
}
