import React from 'react';
import PostList from 'src/app/blog/post/post-list';

export default props => {
  return (
    <div className="container-xl mtb-16px ">
      <div className="row">
        <div className="col-md-10 col-lg-10 col-xl-10">
          <PostList />
        </div>
        <div className="col-md-2 col-lg-2 col-xl-2">

          {/* 榜单抽成一个组件 */}
          <div className="online-contact-container">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">热门榜单</h3>
              </div>
              <div className="list-group">
                <li className="list-group-item">Cras justo odio</li>
                <li className="list-group-item">Dapibus ac facilisis in</li>
                <li className="list-group-item">Morbi leo risus</li>
                <li className="list-group-item">Porta ac consectetur ac</li>
                <li className="list-group-item">Vestibulum at eros</li>
              </div>
            </div>
          </div>

          {/* 推荐关注抽成一个组件 */}
          <div className="online-contact-container">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">推荐关注</h3>
              </div>
              <div className="list-group">
                <li className="list-group-item">Cras justo odio</li>
                <li className="list-group-item">Dapibus ac facilisis in</li>
                <li className="list-group-item">Morbi leo risus</li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
