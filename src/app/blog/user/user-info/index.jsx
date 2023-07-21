import React from 'react';

const UserInfo = () => {
  return (
    <div className="user-info-container">
      <div className="card ">
        <div className="card-header">
          <h3 className=" font-size-18 m-0">作者信息</h3>
        </div>
        <div className="card-body">
          <p>
            <a href="#">头像图片</a>
          </p>
          <p>
            <a href="#"></a>
          </p>
          <p>相看两不厌，唯有敬亭山。</p>
          <p>文章：500</p>
          <p>评论：10</p>
        </div>
        <div className="card-footer">
          <button className="btn btn-primary">关注</button>
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
