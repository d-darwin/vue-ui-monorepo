import { LOADING, OBJECT_FIT } from "./constants";

export interface DensityPictureSource {
  density: number;
  src: string;
}

export interface PictureSource {
  min_width?: number;
  max_width?: number;
  src?: string;
  srcset?: DensityPictureSource[];
}

export type Source = PictureSource[] | PictureSource | string;

export type Loading = typeof LOADING[keyof typeof LOADING];

export type ObjectFit = typeof OBJECT_FIT[keyof typeof OBJECT_FIT];
