import React from 'react';
import CreateComment from '../Comment/Create';
import ListComments from '../Comment/List';

const Item = ({ post }) => {
  return (
    <div
      className="card"
      style={{
        width: '30%',
        marginBottom: '20px'
      }}
    >
      <div className="card-body">
        <h3>{post.title}</h3>
        <ListComments
          comments={post.comments}
        />
        <CreateComment
          id={post.id}
        />
      </div>
    </div>
  )
}

export default Item;
