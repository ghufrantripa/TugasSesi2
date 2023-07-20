const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const playlist = [];

// Menambahkan lagu ke playlist
app.post('/add-song', (req, res) => {
  const { title, artists, url } = req.body;
  if (!title || !artists || !url) {
    return res.status(400).json({ message: 'Title, artists, and URL are required.' });
  }

  const song = { title, artists, url, playCount: 0 };
  playlist.push(song);
  res.status(201).json({ message: 'Song added to playlist successfully.' });
});

// Memainkan lagu dari playlist
app.get('/play-song/:title', (req, res) => {
  const { title } = req.params;
  const song = playlist.find((song) => song.title === title);
  if (!song) {
    return res.status(404).json({ message: 'Song not found in playlist.' });
  }

  // Memperbarui hitungan pemutaran ketika lagu dimainkan
  song.playCount++;
  res.json({ message: 'Playing song', song });
});

// Mendapatkan daftar lagu dari playlist
app.get('/playlist', (req, res) => {
  const sortedPlaylist = playlist.sort((a, b) => b.playCount - a.playCount);
  res.json(sortedPlaylist);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
