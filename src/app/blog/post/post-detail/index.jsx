import React, { useState } from 'react';
import headImgNarrow from 'src/assets/images/headline-narrow.png';
import './index.scss';

//mock-data
import post from "src/mock-data/post-detail-mock.json";

export default props => {
  return (
    <div className="post-detail-container">
      <div className="img-container">
        <img src={headImgNarrow} alt="光刻机" />
      </div>
      <div className="row">
        <div className="col-md-12">
          <h3>{post.title}</h3>
        </div>
      </div>
      <div className="row post-info">
        <div className="col-md-3">
          <span className="fa fa-user"></span>{post.nickName}
        </div>
        <div className="col-md-3">
          <span className="fa fa-clock-o"></span>{post.postTime}
        </div>
        <div className="col-md-3">
          <span className="fa fa-hand-pointer-o"></span>点击：{post.readTimes}
        </div>
        <div className="col-md-3">
          <span className="fa fa-comment"></span>评论：{post.commentTimes}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 post-content">{post.content}
        </div>
      </div>
    </div >
  );
};
