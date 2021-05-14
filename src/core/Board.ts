import Player from './Player';

export const ROWS_REMOVED_EVENT = 'ROWS_REMOVED_EVENT';

class Board {
  public board: number[][] = [];

  constructor(private width: number, private height: number) {
    this.createBoard();
  }

  public isColliding(player: Player): boolean {
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

  public merge(player: Player): void {
    const shape = player.piece.shape;

    shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.board[y + player.pos.y][x + player.pos.x] = value;
        }
      });
    });
  }

  public sweep(): void {
    let removedCount = 0;
    let tempBoard = [...this.board];

    tempBoard = tempBoard.filter((row) => row.includes(0));
    removedCount = this.board.length - tempBoard.length;

    if (removedCount > 0) {
      for (let newRow = 0; newRow < removedCount; newRow++) {
        tempBoard.unshift(new Array(this.width).fill(0));
      }

      const event = new CustomEvent(ROWS_REMOVED_EVENT, {
        detail: { removedCount }
      });

      document.dispatchEvent(event);
      this.board = tempBoard;
    }
  }

  private createBoard(): void {
    for (let i = 0; i < this.height; i++) {
      this.board.push(new Array(this.width).fill(0));
    }
  }
}

export default Board;
