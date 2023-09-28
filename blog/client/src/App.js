import React from 'react';
import CreatePost from './components/Post/Create';
import ListPosts from './components/Post/List';

const App = () => {
  return (
    <div className="container">
      <h1>Create Post</h1>
      <CreatePost />
      <h1>Posts List</h1>
      <ListPosts />
    </div>
  );
}

export default App;
