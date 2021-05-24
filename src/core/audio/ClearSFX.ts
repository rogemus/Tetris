import clearSFX from '../../assets/sfx/clear.wav';
import Audio from './Audio';

class ClearSFX extends Audio {
  constructor() {
    super(clearSFX, 'clearSFX')
  }
}

export default ClearSFX;
