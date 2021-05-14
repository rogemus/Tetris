declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
declare module '*.otf';

interface CanvasRenderingContext2D {
  roundRect: (x: number, y: number, width: number, height: number, radius: number) => void;
}
