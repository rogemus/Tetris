class Audio {
  protected audio: HTMLAudioElement;

  constructor(protected src: string, protected id: string) {
    this.audio = document.createElement('audio') as HTMLAudioElement;
    this.audio.src = src;
    this.audio.id = id;
    this.audio.setAttribute('preload', 'auto');
    this.audio.setAttribute('controls', 'none');
    this.audio.style.display = 'none';
    document.body.appendChild(this.audio);
  }

  public play() {
    this.audio.play();
  }

  public stop() {
    this.audio.pause();
  }
}

export default Audio;
