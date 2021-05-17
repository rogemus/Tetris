export type Position = {
	x: number;
	y: number;
}

export type RotationDirection = 'R' | 'L';

export type Shape = number[][];

export type ScreenSelector = 
  '.game-screen' |
  '.options-screen' |
  '.start-screen' |
  '.end-screen' |
  '.credits-screen';
