import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import PostList from 'src/app/blog/post/post-list';
import "./index.scss";

export default props => {
  return (
    <div className="row">
      <div className="col-md-12">
        <PostList />
      </div>
    </div>
  );
};
