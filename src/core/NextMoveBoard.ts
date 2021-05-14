import Board from './Board';
import Player from './Player';

class NextMoveBoard extends Board {
  constructor(private player: Player) {
    super(document.getElementById('nextMove') as HTMLCanvasElement, 4, 4);
    this.drawPlayer(this.player.nextPiece, { x: 0, y: 0 });
    this.start();
  }

  private start(): void {
    const tick = () => {
      this.drawBoard();
      this.drawPlayer(this.player.nextPiece, { x: 0, y: 0 });
      requestAnimationFrame(tick);
    };

    tick();
  }
}

export default NextMoveBoard;
