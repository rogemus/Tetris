import { Position, RotationDirection } from '../types';
import { ROWS_REMOVED_EVENT } from './Board';
import Piece from './Piece';
import Score from './Score';

class Player {
  public nextPiece: Piece = new Piece();
  public piece: Piece = new Piece();
  public pos: Position = { x: 4, y: 0 };
  public score: Score = new Score();

  constructor() {
    this.attachEvents();
  }

  public drop(): void {
    this.pos.y++;
  }

  public reset() {
    this.pos = { x: 4, y: 0 };
    this.piece = this.nextPiece;
    this.nextPiece = new Piece();
  }

  public move(direction: number): void {
    this.pos.x += direction;
  }

  public revertDrop(): void {
    this.pos.y--;
  }

  public rotate(direction: RotationDirection): void {
    this.piece.flip(direction);
  }

  private attachEvents(): void {
    document.addEventListener(ROWS_REMOVED_EVENT, this.handlePointsChange.bind(this));
  }

  private handlePointsChange(e: CustomEvent): void {
    this.score.add(e.detail.removedCount)
  }
}

export default Player;
