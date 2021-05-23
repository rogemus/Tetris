import tetrisSong from '../assets/tetris.mp3';
import Audio from './Audio';

class Music extends Audio {
  constructor() {
    super(tetrisSong, 'bgmusic')
  }
}

export default Music;
