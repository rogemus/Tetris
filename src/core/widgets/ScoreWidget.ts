import { SCORE_UPDATE_EVENT } from '../game/events';
import Widget from './Widget';

class ScoreWidget extends Widget {
  constructor() {
    super('.score')
    this.updateWidget('0');
    this.attachEvents();
  }

  private attachEvents() {
    document.addEventListener(SCORE_UPDATE_EVENT, this.handleUpdate.bind(this));
  }

  private handleUpdate(event: CustomEvent) {
    this.updateWidget(event.detail.score.points);
  }
}

export default ScoreWidget;
