export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface Arrow {
  point: Point;
  type: string;
  comment: string;
}

export interface ImageProps {
  src: string;
  crop: Rect;
  objects: ImageObject[];
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}
export interface ImageObject {
  point: {
    x: number;
    y: number;
  };
  type: string;
  comment: string;
}

export interface ArrowImageObject extends ImageObject {
  type: "arrow";
  direction?: "lb" | "lt" | "rb" | "rt";
}
