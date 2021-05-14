import { colors } from '../const';
import { Position, RotationDirection } from '../types';
import { getOppositeDirection } from '../utils';

import Board from './Board';
import Player from './Player';

class Game {
  private board: Board;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private dropCounter = 0;
  private dropInterval = 1000;
  private lastTime = 0;
  private player: Player;

  constructor() {
    this.canvas = document.getElementById('tetris') as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');
    this.context.scale(20, 20);
    this.board = new Board(12, 20);
    this.player = new Player();
    this.attachEvents();
  }

  public start(): void {
    const tick = (time = 0) => {
      this.drawBoard();
      const deltaTime = time - this.lastTime;
      this.dropCounter += deltaTime;
      this.lastTime = time;

      if (this.dropCounter > this.dropInterval) {
        this.playerDrop();
      }

      requestAnimationFrame(tick);
    };

    tick();
  }

  private attachEvents(): void {
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowLeft': {
          this.playerMove(-1);
          break;
        }
        case 'ArrowRight': {
          this.playerMove(1);
          break;
        }
        case 'ArrowDown': {
          this.playerDrop();
          break;
        }
        case 'q': {
          this.playerRotate('L');
          break;
        }
        case 'e': {
          this.playerRotate('R');
          break;
        }
      }
    });
  }

  // TODO: More Draw to board
  private drawBoard(): void {
    this.context.fillStyle = '#141020';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawMatrix(this.board.board, { x: 0, y: 0 }, true);
    this.drawMatrix(this.player.piece.shape, this.player.pos, false);
  }

  private drawMatrix(matrix: number[][], offset: Position, renderBlank: boolean): void {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (renderBlank && value >= 0) {
          this.drawBlock(x + offset.x, y + offset.y, colors[value])
        } else if (!renderBlank && value > 0) {
          this.drawBlock(x + offset.x, y + offset.y, colors[value])
        }
      });
    });
  }

  private drawBlock(x: number, y: number, color: string): void {
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

  private playerDrop(): void {
    this.player.drop();
    this.dropCounter = 0;

    if (this.board.isColliding(this.player)) {
      this.player.revertDrop();
      this.board.merge(this.player);
      this.board.sweep();
      this.playerReset();
    }
  }

  private playerMove(direction: number): void {
    this.player.move(direction);

    if (this.board.isColliding(this.player)) {
      this.player.move(direction * -1);
    }
  }

  private playerReset(): void {
    this.player.reset();

    if (this.board.isColliding(this.player)) {
      console.log('end');
    }
  }

  private playerRotate(direction: RotationDirection): void {
    let offset = 1;
    const startingPosition = this.player.pos;
    this.player.rotate(direction);

    while (this.board.isColliding(this.player)) {
      this.player.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));

      if (offset > this.player.piece.shape[0].length) {
        this.player.rotate(getOppositeDirection(direction));
        this.player.pos.x = startingPosition.x;
        return;
      }
    }
  }
}

export default Game;
