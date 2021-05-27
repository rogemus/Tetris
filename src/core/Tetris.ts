import '../styles/game.scss';

import CreditsScreen from './screens/CreditsScreen';
import EndScreen from './screens/EndScreen';
import StartScreen from './screens/StartScreen';

class Tetris {
  private startScreen: StartScreen = new StartScreen();
  private endScreen: EndScreen = new EndScreen();
  private credits: CreditsScreen = new CreditsScreen();
}

export default Tetris;
