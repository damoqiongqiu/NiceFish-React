import React, { useState, useEffect } from 'react';
import headImgNarrow from 'src/assets/images/headline-narrow.png';
import postService from 'src/app/blog/post/post-service';
import './index.scss';

export default props => {
  const [postDetail, setPostDetail] = useState([]);
  useEffect(() => {
    postService.getPostDetail(1).then(response => {
      console.log(response);
      let data = response.data;
      setPostDetail(data);
    });
  }, []);

  return (
    <div className="post-detail-container">
      <div className="img-container">
        <img src={headImgNarrow} alt="光刻机" />
      </div>
      <div className="row">
        <div className="col-md-12">
          <h3>{postDetail.title}</h3>
        </div>
      </div>
      <div className="row post-info">
        <div className="col-md-3">
          <span className="fa fa-user"></span>{postDetail.nickName}
        </div>
        <div className="col-md-3">
          <span className="fa fa-clock-o"></span>{postDetail.postTime}
        </div>
        <div className="col-md-3">
          <span className="fa fa-hand-pointer-o"></span>点击：{postDetail.readTimes}
        </div>
        <div className="col-md-3">
          <span className="fa fa-comment"></span>评论：{postDetail.commentTimes}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 post-content">{postDetail.content}
        </div>
      </div>
    </div >
  );
};
