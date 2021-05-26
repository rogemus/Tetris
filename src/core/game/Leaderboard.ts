interface LeaderboarItem {
  score: number;
  username: string;
}

interface LeaderboarResponse {
  data: LeaderboarItem[]
}

class Leaderboard {
  private elem = document.querySelector('.leaderboard-list');

  public createList(leaderboard: LeaderboarItem[]): void {
    leaderboard.forEach(({ username, score }) => {
      const item = this.createItem(username, score);
      this.elem.appendChild(item);
    });
  }

  public async fetchList(): Promise<LeaderboarResponse> {
    const response = await fetch('/leaderboard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return response.json();
  }

  public async updateList(username: string, score: number): Promise<LeaderboarResponse> {
    const response = await fetch('/leaderboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username, score
      }) 
    });
    return response.json();
  }

  private createItem(username: string, score: number): HTMLLIElement {
    const wrapperEl = document.createElement('li');
    wrapperEl.classList.add('leaderboard-item');

    const contentEl = document.createElement('div');
    contentEl.classList.add('leaderboard-item-content');

    const usernameEl = document.createElement('div');
    usernameEl.classList.add('leaderboard-item-content-username');
    usernameEl.innerText = username;

    const scoreEl = document.createElement('div');
    scoreEl.classList.add('leaderboard-item-content-score');
    scoreEl.innerHTML = `${score}`;

    contentEl.appendChild(usernameEl);
    contentEl.appendChild(scoreEl);
    wrapperEl.appendChild(contentEl);

    return wrapperEl;
  }
}

export default Leaderboard;
