export function parseWidthHeight(
  rawAspectRatio: number | string,
  separator: string
): [width: number, height: number] {
  let width = 1;
  let height = 1;
  const aspectRatio = String(rawAspectRatio);

  const [rawWidth, rawHeight] = aspectRatio.split(separator);
  if (parseInt(rawWidth?.trim()) && parseInt(rawHeight?.trim())) {
    width = parseInt(rawWidth?.trim());
    height = parseInt(rawHeight?.trim());
  }

  return [width, height];
}
