import { END_GAME_EVENT } from './GameBoard';
import Screen from './Screen';

class EndScreen extends Screen {
  private restartBtn: HTMLButtonElement = document.querySelector('.game-restart');
  private scoreElem: HTMLDivElement = document.querySelector('.results-score-value');

  constructor() {
    super();
    this.attachEvents();
  }

  private attachEvents() {
    document.addEventListener(END_GAME_EVENT, this.handleEnd.bind(this));
    this.restartBtn.addEventListener('click', this.handleRestart.bind(this));
  }

  private handleEnd(event: CustomEvent) {
    this.scoreElem.innerHTML = event.detail.score.points;
    this.navigateTo('.end-screen');
  }

  private handleRestart() {
    this.navigateTo('.start-screen');
  }
}

export default EndScreen;
