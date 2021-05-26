import { ScreenSelector } from '../../types';

class Screen {
  public navigateTo(screenSelector: ScreenSelector): void {
    const screen = document.querySelector(screenSelector);
    const active = document.querySelector('.screen.show');

    active.classList.remove('show');
    screen.classList.add('show');
  }
}


export default Screen;
