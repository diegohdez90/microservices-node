const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  switch (type) {
    case 'POST_CREATED':
      const { id: postIdCreated, title } = data;
      posts[postIdCreated] = {
        id: postIdCreated,
        title,
        comments: []
      };
      break;
    case 'COMMENT_CREATED':
        const {
          id: commentId,
          content,
          postId
        } = data;
        const post = posts[postId];
        post.comments.push({
          id: commentId,
          content
        });
        break;
    default:
      break;
  }

  console.log('posts', posts);

  res.send({});
});

app.listen(4002, () => {
  console.log('listen query');
});
