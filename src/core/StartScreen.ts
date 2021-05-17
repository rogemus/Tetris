import { ScreenSelector } from '../types';
import Game from './Game';
import Screen from './Screen';

class StartScreen extends Screen {
  constructor(private game: Game) {
    super();
    this.attachEvents();
  }

  attachEvents() {
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
    })
  }
}

export default StartScreen;
