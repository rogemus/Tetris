class Audio {
  protected audio: HTMLAudioElement;

  constructor(protected src: string, protected id: string, loop = false) {
    this.audio = document.createElement('audio') as HTMLAudioElement;
    this.audio.src = src;
    this.audio.id = id;
    this.audio.setAttribute('preload', 'auto');
    this.audio.setAttribute('controls', 'none');
    this.audio.setAttribute('loop', `${loop}`);
    this.audio.style.display = 'none';
    document.body.appendChild(this.audio);
  }

  public play(): void {
    this.audio.play();
  }

  public stop(): void {
    this.audio.pause();
  }
}

export default Audio;
