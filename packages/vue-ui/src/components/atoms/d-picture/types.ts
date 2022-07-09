import { SOURCE_TYPE, LOADING, OBJECT_FIT } from "./constants";

export interface DensityPictureSource {
  density: number;
  src: string;
  type?: string; // TODO: use, more accurate type: svg -> image/svg+xml
  media?: string; // TODO: use this instead of construct own
}

export interface PictureSource {
  min_width?: number;
  max_width?: number;
  src?: string;
  srcset?: DensityPictureSource[];
  type?: string; // TODO: use, more accurate type: svg -> image/svg+xml
  media?: string; // TODO: use this instead of construct own
}

export type Source = PictureSource[] | PictureSource | string;

export type SourceType = typeof SOURCE_TYPE[keyof typeof SOURCE_TYPE];

export type Loading = typeof LOADING[keyof typeof LOADING];

export type ObjectFit = typeof OBJECT_FIT[keyof typeof OBJECT_FIT];
