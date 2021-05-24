import { RotationDirection } from '../../types';
import { dispatchEvent, getOppositeDirection } from '../../utils';
import ClearSFX from '../audio/ClearSFX';
import Theme from '../audio/Theme';
import Board from './Board';
import { END_GAME_EVENT, ROWS_REMOVED_EVENT } from './events';
import Player from './Player';

class GameBoard extends Board {
  private dropCounter = 0;
  private dropInterval = 750;
  private lastTime = 0;
  private theme = new Theme();
  private paused = false;
  private sfx = new ClearSFX();

  constructor(private player: Player) {
    super(
      document.querySelector('.game-board') as HTMLDivElement,
      'tetris',
      12,
      20
    );
    this.attachEvents();
  }

  public start(): void {
    const tick = (time = 0) => {
      if (!this.paused) {
        this.drawBoard();
        this.drawPlayer(this.player.piece, this.player.pos);
        const deltaTime = time - this.lastTime;
        this.lastTime = time;
        this.dropCounter += deltaTime;
        const dropInterval = this.dropInterval / this.player.speed.speedMultiplier;

        if (this.dropCounter > dropInterval) {
          this.playerDrop();
        }
      }

      requestAnimationFrame(tick);
    };
    this.theme.play();
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
        case 'Escape': {
          this.paused = !this.paused;
          break;
        }
      }
    });
  }

  public restart() {
    this.createBoard();
    this.player.clear();
    this.paused = false;
  }

  private isColliding(player: Player): boolean {
    const shape = player.piece.shape;
    const position = player.pos;

    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (
          shape[y][x] !== 0 &&
          (
            this.board[y + position.y] &&
            this.board[y + position.y][x + position.x]
          ) !== 0
        ) {
          return true;
        }
      }
    }

    return false;
  }

  private merge(player: Player): void {
    const shape = player.piece.shape;

    shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.board[y + player.pos.y][x + player.pos.x] = value;
        }
      });
    });
  }

  private playerDrop(): void {
    this.player.drop();
    this.dropCounter = 0;

    if (this.isColliding(this.player)) {
      this.player.revertDrop();
      this.merge(this.player);
      this.sweep();
      this.playerReset();
    }
  }

  private playerMove(direction: number): void {
    this.player.move(direction);

    if (this.isColliding(this.player)) {
      this.player.move(direction * -1);
    }
  }

  private playerReset(): void {
    this.player.reset();

    if (this.isColliding(this.player)) {
      this.paused = true;
      this.theme.stop();
      dispatchEvent(END_GAME_EVENT, {
        score: this.player.score,
      });
    }
  }

  private playerRotate(direction: RotationDirection): void {
    let offset = 1;
    const startingPosition = this.player.pos;
    this.player.rotate(direction);

    while (this.isColliding(this.player)) {
      this.player.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));

      if (offset > this.player.piece.shape[0].length) {
        this.player.rotate(getOppositeDirection(direction));
        this.player.pos.x = startingPosition.x;
        return;
      }
    }
  }

  private sweep(): void {
    let removedCount = 0;
    let tempBoard = [...this.board];

    tempBoard = tempBoard.filter((row) => row.includes(0));
    removedCount = this.board.length - tempBoard.length;

    if (removedCount > 0) {
      for (let newRow = 0; newRow < removedCount; newRow++) {
        tempBoard.unshift(new Array(this.width).fill(0));
      }

      this.board = tempBoard;
      dispatchEvent(ROWS_REMOVED_EVENT, { removedCount })
      this.sfx.play();
    }
  }
}

export default GameBoard;
