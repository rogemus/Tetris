import { ScreenSelector } from '../../types';
import { END_GAME_EVENT } from '../game/events';
import Game from './GameScreen';
import Screen from './Screen';

class StartScreen extends Screen {
  private game: Game = new Game();

  constructor() {
    super();
    this.attachEvents();
  }

  public handleEnd(): void {
    this.game.restart();
  }

  private attachEvents() {
    const links = document.querySelectorAll<HTMLLIElement>('.menu-item');

    links.forEach((link) => {
      const screenType = link.dataset.screen;
      const screenSelector = `.${screenType}-screen` as ScreenSelector;

      link.addEventListener('click', () => {
        this.navigateTo(screenSelector);

        if (screenSelector === '.game-screen') {
          this.game.start();
        }
      });
    });

    document.addEventListener(END_GAME_EVENT, this.handleEnd.bind(this));
  }
}

export default StartScreen;
