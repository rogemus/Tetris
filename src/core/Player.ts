import { Position, RotationDirection } from '../types';
import { ROWS_REMOVED_EVENT } from './GameBoard';
import Piece from './Piece';

export const SCORE_UPDATE_EVENT = 'SCORE_UPDATE_EVENT';
export const SPEED_UPDATE_EVENT = 'SPEED_UPDATE_EVENT';

class Player {
  public nextPiece: Piece = new Piece();
  public piece: Piece = new Piece();
  public pos: Position = { x: 4, y: 0 };
  public score = {
    pointsMultiplayer: 5,
    points: 0,
    combo: 1
  }

  public speed = {
    speedLevel: 1,
    speedMultiplayer: 1
  }

  constructor() {
    this.attachEvents();
  }

  public drop(): void {
    this.pos.y++;
  }

  public move(direction: number): void {
    this.pos.x += direction;
  }

  public reset() {
    this.pos = { x: 4, y: 0 };
    this.piece = this.nextPiece;
    this.nextPiece = new Piece();
  }

  public revertDrop(): void {
    this.pos.y--;
  }

  public rotate(direction: RotationDirection): void {
    this.piece.flip(direction);
  }

  private addScore(points: number): void {
    this.score.combo = points;
    this.score.points += points * this.score.combo * this.score.pointsMultiplayer;
  }

  private attachEvents(): void {
    document.addEventListener(ROWS_REMOVED_EVENT, this.handlePointsChange.bind(this));
  }

  private handlePointsChange(e: CustomEvent): void {
    this.addScore(e.detail.removedCount);
    this.speedUp();

    const scoreEvent = new CustomEvent(SCORE_UPDATE_EVENT, {
      detail: {
        score: this.score
      }
    });
    const speedEvent = new CustomEvent(SPEED_UPDATE_EVENT, {
      detail: {
        speed: this.speed
      }
    });

    document.dispatchEvent(scoreEvent);
    document.dispatchEvent(speedEvent);
  }

  private speedUp(): void {
    if (
      this.speed.speedLevel < 5 && (
        this.score.points >= 20 ||
        this.score.points >= 100 ||
        this.score.points >= 300 ||
        this.score.points >= 800
      )
    ) {
      this.score.pointsMultiplayer += 2;
      this.speed.speedLevel += 1;
      this.speed.speedMultiplayer += 0.5;
    }
  }
}

export default Player;
