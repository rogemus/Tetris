import Widget from './Widget';
import { SPEED_UPDATE_EVENT } from './Player';

class SpeedWidget extends Widget {
  constructor() {
    super('.speed')
    this.updateWidget('1');
    this.attachEvents();
  }

  private attachEvents() {
    document.addEventListener(SPEED_UPDATE_EVENT, this.handleUpdate.bind(this));
  }

  private handleUpdate(event: CustomEvent) {
    this.updateWidget(event.detail.speed.speedMultiplier);
  }
}

export default SpeedWidget;
