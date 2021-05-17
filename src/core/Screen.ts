
import { ScreenSelector } from '../types';

class Screen {
  public navigateTo(screenSelector: ScreenSelector) {
    const screen = document.querySelector(screenSelector);
    const active = document.querySelector('.show');

    active.classList.remove('show');
    screen.classList.add('show');
  }
}


export default Screen;
