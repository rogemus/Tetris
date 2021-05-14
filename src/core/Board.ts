import { colors } from '../const';
import { Position } from '../types';
import Piece from './Piece';

export const ROWS_REMOVED_EVENT = 'ROWS_REMOVED_EVENT';

class Board {
  private context: CanvasRenderingContext2D;

  protected board: number[][] = [];

  constructor(
    protected canvas: HTMLCanvasElement,
    protected width: number,
    protected height: number
  ) {
    this.context = this.canvas?.getContext('2d');
    this.context.scale(20, 20);
    this.createBoard();
    this.drawBoard();
  }

  protected createBoard(): void {
    for (let i = 0; i < this.height; i++) {
      this.board.push(new Array(this.width).fill(0));
    }
  }

  protected drawBlock(x: number, y: number, color: string): void {
    this.context.roundRect(
      x,
      y,
      1 - 0.13,
      1 - 0.13,
      0.2
    );
    this.context.fillStyle = color;
    this.context.fill();
  }

  protected drawBoard() {
    this.context.fillStyle = '#141020';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.board.forEach((row, y) => {
      row.forEach((value, x) => {
        this.drawBlock(x, y, colors[value])
      });
    });
  }

  protected drawPlayer(piece: Piece, offset: Position) {
    piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.drawBlock(
            x + offset.x,
            y + offset.y,
            colors[value]
          )
        }
      });
    });
  }
}

export default Board;
