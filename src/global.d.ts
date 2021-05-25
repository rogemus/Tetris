declare module '*.mp3';
declare module '*.wav';

interface CanvasRenderingContext2D {
  roundRect: (
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) => void;
}
