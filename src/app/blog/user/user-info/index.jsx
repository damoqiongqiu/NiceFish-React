import React from 'react';
import './index.scss';

export default props => {
  return (
    <div className="user-info-container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">作者信息</h3>
        </div>
        <div className="panel-body">
          <p><a href="#">头像图片</a></p>
          <p><a href="#">大漠穷秋</a></p>
          <p>相看两不厌，唯有敬亭山。</p>
          <p>文章：500</p>
          <p>评论：10</p>
        </div>
        <div className="panel-footer">
          <button className="btn btn-primary">关注</button>
        </div>
      </div>
    </div>
  );
};