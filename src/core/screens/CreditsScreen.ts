import Screen from './Screen';

class CreditsScreen extends Screen {
  private backBtn = document.querySelector('.nav-back') as HTMLButtonElement;

  constructor() {
    super();

    this.attachEvents();
  }

  private attachEvents() {
    this.backBtn.addEventListener('click', () => {
      this.navigateTo('.start-screen');
    });
  }

}

export default CreditsScreen;
