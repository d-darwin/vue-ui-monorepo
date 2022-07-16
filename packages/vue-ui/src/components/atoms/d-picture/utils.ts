// TODO: descr, move to the common utils?
export function constructMediaQuery(item: {
  src?: string;
  srcset?: string;
  min_width?: number;
  max_width?: number;
  media?: string;
}): string | undefined {
  if (item.media) {
    return item.media;
  }

  if (item.min_width && item.max_width) {
    return `(min-width: ${item.min_width}px) and (max-width: ${item.max_width}px)`;
  } else if (item.min_width) {
    return `(min-width: ${item.min_width}px)`;
  } else if (item.max_width) {
    return `(max-width: ${item.max_width}px)`;
  }

  return undefined;
}
