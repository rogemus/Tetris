import { RotationDirection } from '../types';

export const getOppositeDirection = (direction: RotationDirection): RotationDirection => {
  if (direction === 'L') {
    return 'R';
  }

  return 'L';
};

export const dispatchEvent = (eventName: string, data: any): void => {
  const event = new CustomEvent(eventName, {
    detail: data
  });

  document.dispatchEvent(event);
}
