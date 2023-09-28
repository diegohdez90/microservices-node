import React, { Fragment } from 'react';

const Item = ({
  comment
}) => {
  return (
    <Fragment>
      <li>{comment.content}</li>
    </Fragment>
  )
}

export default Item;
