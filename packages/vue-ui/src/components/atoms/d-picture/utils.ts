import {
  DensityPictureSource,
  PictureSource,
  PreparedSource,
} from "@/components/atoms/d-picture/types";

// TODO: descr, move to the common utils?
function constructMediaQuery(item: {
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

// TODO: descr
function prepareDensitySrcset(
  densityPictureSourceList?: DensityPictureSource[]
): string | undefined {
  return densityPictureSourceList?.reduce((srcset, densityPictureSource) => {
    srcset +=
      (srcset ? ", " : "") +
      densityPictureSource.src +
      " " +
      densityPictureSource.density;
    return srcset;
  }, "");
}

export function prepareSource(source: PictureSource): PreparedSource {
  return {
    src: source.src || "", // TODO: fallback if no src but there is srcset
    type: source.type,
    media: constructMediaQuery(source),
    srcset: prepareDensitySrcset(source.srcset),
  };
}
