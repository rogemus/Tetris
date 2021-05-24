import { ScreenSelector } from '../types';
import Game from './Game';
import { END_GAME_EVENT } from './GameBoard';
import Screen from './Screen';

class StartScreen extends Screen {
  private game: Game;

  constructor() {
    super();
    this.game = new Game()
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
        this.navigateTo(screenSelector)

        if (screenSelector === '.game-screen') {
          this.game.start();
        }
      })
    });

    document.addEventListener(END_GAME_EVENT, this.handleEnd.bind(this));
  }
}

export default StartScreen;
