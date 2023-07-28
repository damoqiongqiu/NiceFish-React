import React from 'react';
import PostDetail from 'src/app/blog/post/post-detail';
import CommentList from 'src/app/blog/comment-list';
import UserInfo from 'src/app/blog/user/user-info';
import './index.scss';

export default props => {
  return (
    <div className="post-detail-main-container">
      <div className="row">
        <div className="col-md-9">
          <PostDetail {...props} />
          <CommentList />
        </div>
        <div className="col-md-3">
          <UserInfo />
        </div>
      </div>
    </div>
  );
};