const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
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
}

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  console.log('query events');
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log('listen query');

  const res = await axios.get('http://localhost:4005/events');
  for (let event of res.data) {
    console.log('processing event', event.type);
    handleEvent(event.type, event.data)
  }
});

/* 
  axios.post('http://localhost:4000/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://localhost:4001/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://localhost:4002/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://localhost:4003/events', event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: 'OK' });
*/