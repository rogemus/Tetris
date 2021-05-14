import Player from './Player';
import GameBoard from './GameBoard';
import NextMoveBoard from './NextMoveBoard';

class Game {
  private player: Player = new Player();
  private gameBoard: GameBoard = new GameBoard(this.player);
  private nextMoveBoard: NextMoveBoard = new NextMoveBoard(this.player);

  public start(): void {
    this.gameBoard.start();
  }
}

export default Game;
