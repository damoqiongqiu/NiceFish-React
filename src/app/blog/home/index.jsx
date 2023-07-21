import React from 'react';
import OnlineContact from './online-contact';
import PostList from 'src/app/blog/read/post-list';

export default props => {
  return (
    <div className="container-xl mtb-16px ">
      <div className="row">
        <div className="col-md-7 col-lg-8 col-xl-9">
          <PostList />
        </div>
        <div className="col-md-5 col-lg-4 col-xl-3">
          <OnlineContact />
        </div>
      </div>
    </div>
  );
};
