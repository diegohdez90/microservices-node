const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const {
    type,
    data
  } = req.body;

  if (type === 'COMMENT_CREATED') {
    const status = data.content.includes('orange') ? 'REJECTED' : 'APPROVED';
    await axios.post('http://localhost:4005/events', {
      type: 'COMMENT_MODERATED',
      data: {
        id: data.id,
        postId: data.postId,
        content: data.content,
        status
      }
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log('listen moderator');
});
