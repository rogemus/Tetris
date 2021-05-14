import { shapes } from '../const';
import { RotationDirection, Shape } from '../types';

class Piece {
  private pieces: Shape[] = shapes;

  public id: number;
  public shape: Shape;
  public colorId: number;

  constructor() {
    this.id = this.getRandomIndex(0, 6);
    this.shape = this.getRandomShape();
  }

  public flip(direction: RotationDirection): void {
    let fliped: Shape;

    switch (direction) {
      case 'R': {
        fliped = this.flipShape(this.shape.reverse());
        break;
      }
      case 'L': {
        fliped = this.flipShape(this.shape).reverse();
        break;
      }
    }

    this.shape = fliped;
  }

  private colorPiece(piece: Shape, colorIndex: number): Shape {
    const coloredPiece = piece.map((row) => (
      row.map((value) => (
        value * (colorIndex + 1)
      ))
    ));

    return coloredPiece;
  }

  private flipShape(matrix: Shape): Shape {
    return (
      matrix.map((column, x) => (
        matrix.map((row) => (
          row[x]
        ))
      ))
    );
  }

  private getRandomIndex(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private getRandomShape(): Shape {
    const shape = this.pieces[this.id];
    const colorPiece = this.colorPiece(shape, this.id);
    return colorPiece;
  }
}

export default Piece;
