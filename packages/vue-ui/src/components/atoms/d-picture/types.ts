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
