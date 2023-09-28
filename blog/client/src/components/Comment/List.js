import React from 'react';
import CommentItem from './Item';

const List = ({
  comments
}) => {

  const commentItems = comments
    .filter(comment => comment.status === 'APPROVED')
    .map(comment => (
      <CommentItem
        key={comment.id}
        comment={comment}
      />
    ));

  return (
    <ul>
      {commentItems}
    </ul>
  );
}

export default List;
