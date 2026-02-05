const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;
const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'socialApp';

let db;
MongoClient.connect(DB_URL).then(client => {
  db = client.db(DB_NAME);
  console.log("Connected to MongoDB");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/style.css', express.static(path.join(__dirname, 'public/style.css')));

// Home Page
app.get('/', async (req, res) => {
  const posts = await db.collection('posts').find().sort({ timestamp: -1 }).toArray();
  let html = fs.readFileSync('./views/index.html', 'utf8');

  let feed = '';
  posts.forEach(post => {
    feed += `
      <div class="post">
        <strong>${post.username}</strong> <em>(${new Date(post.timestamp).toLocaleString()})</em>
        <p>${post.content}</p>
      </div>
    `;
  });

  html = html.replace('<!-- FEED -->', feed);
  res.send(html);
});

// Handle Post Submission
app.post('/post', (req, res) => {
  const { username, content } = req.body;
  db.collection('posts').insertOne({
    username,
    content,
    timestamp: new Date()
  });
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
