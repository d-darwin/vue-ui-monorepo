export default function prepareHtmlSize(
  size?: string | number
): string | undefined {
  if (typeof size === "number") {
    return size + "px";
  }

  return size;
}
