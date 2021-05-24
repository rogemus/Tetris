import { Position, RotationDirection } from '../../types';
import { dispatchEvent } from '../../utils';
import { ROWS_REMOVED_EVENT, SCORE_UPDATE_EVENT, SPEED_UPDATE_EVENT } from './events';
import Piece from './Piece';

class Player {
  public nextPiece: Piece = new Piece();
  public piece: Piece = new Piece();
  public pos: Position = { x: 4, y: 0 };
  public score = {
    pointsMultiplier: 5,
    points: 0,
    combo: 1
  }

  public speed = {
    speedLevel: 1,
    speedMultiplier: 1
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

  public reset(): void {
    this.pos = { x: 4, y: 0 };
    this.piece = this.nextPiece;
    this.nextPiece = new Piece();
  }

  public clear(): void {
    this.pos = { x: 4, y: 0 };
    this.piece = new Piece();
    this.nextPiece = new Piece();
    this.score = {
      pointsMultiplier: 5,
      points: 0,
      combo: 1
    };
    dispatchEvent(SCORE_UPDATE_EVENT, {
      score: this.score
    });
    dispatchEvent(SPEED_UPDATE_EVENT, {
      speed: this.speed
    });
  }

  public revertDrop(): void {
    this.pos.y--;
  }

  public rotate(direction: RotationDirection): void {
    this.piece.flip(direction);
  }

  private addScore(points: number): void {
    this.score.combo = points;
    this.score.points += points * this.score.combo * this.score.pointsMultiplier;
  }

  private attachEvents(): void {
    document.addEventListener(ROWS_REMOVED_EVENT, this.handlePointsChange.bind(this));
  }

  private handlePointsChange(e: CustomEvent): void {
    this.addScore(e.detail.removedCount);
    this.speedUp();
    dispatchEvent(SCORE_UPDATE_EVENT, {
      score: this.score
    });
    dispatchEvent(SPEED_UPDATE_EVENT, {
      speed: this.speed
    });
  }

  private speedUp(): void {
    if (
      this.speed.speedLevel < 7 && (
        this.score.points >= 20 ||
        this.score.points >= 100 ||
        this.score.points >= 300 ||
        this.score.points >= 600 ||
        this.score.points >= 900 ||
        this.score.points >= 1500
      )
    ) {
      this.score.pointsMultiplier += 2;
      this.speed.speedLevel += 1;
      this.speed.speedMultiplier += 1;
    }
  }
}

export default Player;
