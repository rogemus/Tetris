class Score {
  private element: HTMLDivElement = document.getElementById('score') as HTMLDivElement;

  public pointsMultiplayer = 5;
  public points = 0;

  constructor() {
    this.updateScore(0)
  }

  public add(points: number): void {
    this.points += points * this.pointsMultiplayer;
    this.updateScore(this.points);
  }

  private updateScore(points: number): void {
    this.element.innerText = `Score: ${points}`;
  }
}

export default Score;
