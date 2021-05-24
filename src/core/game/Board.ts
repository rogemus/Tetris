import './Canvas';

import { colors } from '../../const';
import { Position } from '../../types';
import Piece from './Piece';

class Board {
  private context: CanvasRenderingContext2D;
  protected canvas: HTMLCanvasElement;

  protected board: number[][] = [];
  protected scale = 20;

  constructor(
    protected canvasParent: HTMLDivElement,
    protected canvasId: string,
    protected width: number,
    protected height: number
  ) {
    this.createCanvas();
    this.createBoard();
    this.drawBoard();
  }
  private createCanvas(): void {
    this.canvasParent.innerHTML = '';
    this.canvas = document.createElement('canvas');
    this.canvas.id = this.canvasId;
    this.canvas.width = this.width * this.scale;
    this.canvas.height = this.height * this.scale;
    this.canvasParent.appendChild(this.canvas);
    this.context = this.canvas?.getContext('2d');
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.scale(this.scale, this.scale);
  }

  protected createBoard(): void {
    this.board = [];

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

  protected drawBoard(): void {
    this.context.fillStyle = '#141020';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.board.forEach((row, y) => {
      row.forEach((value, x) => {
        this.drawBlock(x, y, colors[value]);
      });
    });
  }

  protected drawPlayer(piece: Piece, offset: Position): void {
    piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.drawBlock(x + offset.x, y + offset.y, colors[value]);
        }
      });
    });
  }
}

export default Board;
