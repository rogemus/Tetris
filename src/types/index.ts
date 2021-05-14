export type Position = {
	x: number;
	y: number;
}

export type RotationDirection = 'R' | 'L';

export type Shape = number[][];

export type SCREEN = 'GAME' | 'START' | 'END' | 'OPTIONS' | 'CREDITS';

export type SCREEN_EVENT = {
  screen: SCREEN,
  data: any
}
