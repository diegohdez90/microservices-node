import React, { useState } from 'react';
import axios from 'axios';

const Create = ({
  id
}) => {
  const [content, setContent] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('req content');
    await axios.post(`http://localhost:4001/posts/${id}/comments`, {
      content
    });

    setContent('');
  }

  return (
    <div>
      Post a comment
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Comment</label>
          <input
            className="form-control"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Create;
