import React from 'react';
import OnlineContact from './online-contact';
import PostList from 'src/app/blog/post/post-list';

export default props => {
  return (
    <div className="container-xl mtb-16px ">
      <div className="row">
        <div className="col-md-9 col-lg-9 col-xl-9">
          <PostList />
        </div>
        <div className="col-md-3 col-lg-3 col-xl-3">
          <OnlineContact />
        </div>
      </div>
    </div>
  );
};
