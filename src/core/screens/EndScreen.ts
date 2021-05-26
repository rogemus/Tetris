import { END_GAME_EVENT } from '../game/events';
import Leaderboard from '../game/Leaderboard';
import Screen from './Screen';

class EndScreen extends Screen {
  private restartBtn: HTMLButtonElement = document.querySelector('.game-restart');
  private scoreElem: HTMLDivElement = document.querySelector('.results-score-value');
  private form: HTMLFormElement = document.querySelector('.leaderboard-form');
  private input: HTMLInputElement = document.querySelector('.leaderboard-form-input');
  private leaderboard: Leaderboard = new Leaderboard();
  private points = 0;

  constructor() {
    super();

    this.attachEvents();
  }

  private attachEvents() {
    document.addEventListener(END_GAME_EVENT, this.handleEnd.bind(this));
    this.restartBtn.addEventListener('click', this.handleRestart.bind(this));
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  private handleSubmit(event: Event) {
    event.preventDefault();
    this.form.classList.remove('show');
    this.leaderboard
      .updateList(this.input.value, this.points)
      .then(({ data }) => {
        this.leaderboard.createList(data);
      });
  }

  private handleEnd(event: CustomEvent) {
    this.points = event.detail.score.points;
    this.scoreElem.innerHTML = `${this.points}`;
    this.form.classList.add('show');
    this.navigateTo('.end-screen');
  }

  private handleRestart() {
    this.navigateTo('.start-screen');
  }
}

export default EndScreen;
