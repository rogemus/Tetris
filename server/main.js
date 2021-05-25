const express = require('express');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 80;

const LEADERBOARD_FILE = `${__dirname}/leaderboard.json`;

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

app.use('/', express.static('public'));

app.get('/leaderboard', (req, res) => {
  try {
    const leaderboard = fs.readFileSync(LEADERBOARD_FILE, 'utf8');

    res.json({
      data: JSON.parse(leaderboard),
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

app.post('/leaderboard', (req, res) => {
  const newEntry = req.body;

  try {
    const data = fs.readFileSync(LEADERBOARD_FILE, 'utf8');
    const leaderboard = JSON.parse(data);
    leaderboard.push(newEntry);

    const sorted = leaderboard.sort((a, b) => (b.score - a.score));
    sorted.slice(0, 25);
    
    fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify(sorted), 'utf8');

    res.json({
      data: sorted,
    });
  } catch {
    res.sendStatus(400);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
