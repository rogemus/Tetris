import tetrisSong from '../../assets/music/theme.mp3';
import Audio from './Audio';

class Theme extends Audio {
  constructor() {
    super(tetrisSong, 'bgmusic', true);
  }
}

export default Theme;
