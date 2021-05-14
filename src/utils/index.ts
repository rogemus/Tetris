import { RotationDirection } from '../types';

export const getOppositeDirection = (direction: RotationDirection): RotationDirection => {
  if (direction === 'L') {
    return 'R';
  }

  return 'L';
};
