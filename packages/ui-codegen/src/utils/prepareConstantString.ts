// TODO: descr
export default function(constantVariantName: string, constantVariantValue?: string | Record<string, unknown>): string {
  let value = constantVariantValue || constantVariantName;
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  } else {
    value = `"${value}"`
  }

  return `  ${constantVariantName.replace("-", "_").toUpperCase()}: ${value},`;
}
