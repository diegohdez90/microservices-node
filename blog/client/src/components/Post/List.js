import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from './Item';

const List = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4002/posts');
    setPosts(res.data);
  }
  
  const postItems = Object.values(posts)
    .map(post => (
      <PostItem
        key={post.id}
        post={post}
      />
    ))

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {postItems}
    </div>
  )
}

export default List;
