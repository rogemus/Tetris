import '../styles/game.css';

import EndScreen from './screens/EndScreen';
import StartScreen from './screens/StartScreen';

class Tetris {
  private startScreen: StartScreen = new StartScreen();
  private endScreen: EndScreen = new EndScreen()
}

export default Tetris;

