const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({
    id: id,
    content: content,
    status: 'PENDING'
  });
  commentsByPostId[req.params.id] = comments;

  await axios.post('http://localhost:4005/events', {
    type: 'COMMENT_CREATED',
    data: {
      id,
      content,
      status: 'PENDING',
      postId: req.params.id
    }
  });

  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  console.log('receive event', req.body);
  const { type, data } = req.body;

  if (type === 'COMMENT_MODERATED') {
    const {
      postId,
      id,
      status,
      content,
    } = data;

    const comments = commentsByPostId[postId];

    const comment = comments.find(commentItem => {
      return commentItem.id === id
    });

    comment.status = status;

    await axios.post('http://localhost:4005/events', {
      type: 'COMMENT_UPDATED',
      data: {
        id,
        status,
        postId,
        content,
      }
    })
  }
  res.send({});
});

app.listen(4001, () => {
  console.log('listen comments');
});
