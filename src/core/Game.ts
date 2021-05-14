import Player from './Player';
import GameBoard from './GameBoard';
import NextMoveBoard from './NextMoveBoard';
import ScoreWidget from './ScoreWidget';
import SpeedWidget from './SpeedWidget';

class Game {
  private player: Player = new Player();
  private gameBoard: GameBoard = new GameBoard(this.player);
  private nextMoveBoard: NextMoveBoard = new NextMoveBoard(this.player);
  private scoreWidget: ScoreWidget = new ScoreWidget();
  private speedWidget: SpeedWidget = new SpeedWidget();

  public start(): void {
    this.gameBoard.start();
  }
}

export default Game;
