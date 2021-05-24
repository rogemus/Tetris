import Board from '../game/Board';
import Player from '../game/Player';

class NextMoveWidget extends Board {
  constructor(private player: Player) {
    super(
      document.querySelector('.nextMove-board') as HTMLDivElement,
      'nextMove',
      4,
      4
    );
    this.drawPlayer(this.player.nextPiece, { x: 0, y: 0 });
    this.start();
  }

  private start(): void {
    const tick = () => {
      this.drawBoard();
      this.drawPlayer(this.player.nextPiece, { x: 1, y: 0 });
      requestAnimationFrame(tick);
    };

    tick();
  }
}

export default NextMoveWidget;
