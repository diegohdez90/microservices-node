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
  console.log('query events');
  const { type, data } = req.body;

  if (type === 'POST_CREATED') {
    const { id: postIdCreated, title } = data;
    posts[postIdCreated] = {
      id: postIdCreated,
      title,
      comments: []
    };
  } else if (type === 'COMMENT_CREATED') {
    const {
      id: commentId,
      content,
      postId,
      status
    } = data;
    const post = posts[postId];
    post.comments.push({
      id: commentId,
      content,
      status,
    });
  } else if (type === 'COMMENT_UPDATED') {
    const {
      id,
      content,
      postId,
      status
    } = data;
    const post = posts[postId];
    const comment = post.comments.find(commentItem => commentItem.id === id);
    comment.status = status;
    comment.content = content;
  }

  console.log('posts', posts);

  res.send({});
});

app.listen(4002, () => {
  console.log('listen query');
});
