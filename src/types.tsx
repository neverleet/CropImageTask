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
  
export interface ImageObject {
    type: unknown;
    point: Point
    comment?: string;
  }
  
export interface ArrowImageObject extends ImageObject {
    type: "arrow"; 
    direction?: "lb" | "lt" | "rb" | "rt";
  }
  
export interface ImageProps {
    src: string
    crop: Rect;
    objects: ImageObject[];
  }