import './Canvas';
import '../styles/game.css';

import EndScreen from './EndScreen';
import Game from './Game';
import StartScreen from './StartScreen';

class Tetris {
  private startScreen: StartScreen = new StartScreen();
  private endScreen: EndScreen = new EndScreen()
}

export default Tetris;

