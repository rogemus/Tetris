import GameBoard from '../game/GameBoard';
import Player from '../game/Player';
import NextMoveBoard from '../widgets/NextMoveWidget';
import ScoreWidget from '../widgets/ScoreWidget';
import SpeedWidget from '../widgets/SpeedWidget';

class GameScreen {
  private player: Player = new Player();
  private gameBoard: GameBoard = new GameBoard(this.player);
  private nextMoveBoard: NextMoveBoard = new NextMoveBoard(this.player);
  private scoreWidget: ScoreWidget = new ScoreWidget();
  private speedWidget: SpeedWidget = new SpeedWidget();

  public start(): void {
    this.gameBoard.start();
  }

  public restart(): void {
    this.gameBoard.restart();
  }
}

export default GameScreen;
