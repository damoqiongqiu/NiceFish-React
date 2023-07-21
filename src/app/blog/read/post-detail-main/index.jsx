import React from 'react';
import PostDetail from 'src/app/blog/read/post-detail';
import CommentList from 'src/app/blog/read/comment-list';
import UserInfo from 'src/app/blog/user/user-info';

const PostDetailMain = props => {
  return (
    <div className="container post-detail-main-container mtb-16px">
      <div className="row">
        <div className="col-md-8 col-lg-9">
          <PostDetail {...props} />
          <CommentList />
        </div>
        <div className="col-md-4 col-lg-3 sm-mt-16px">
          <UserInfo />
        </div>
      </div>
    </div>
  );
};

export default PostDetailMain;
