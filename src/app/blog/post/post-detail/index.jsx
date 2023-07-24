import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import headImgNarrow from 'src/assets/images/headline-narrow.png';
import postService from 'src/app/blog/post/post-service';
import './index.scss';

export default props => {
  const { id } = useParams()
  const [postDetail, setPostDetail] = useState({});

  useEffect(() => {
    postService.getPostDetail(id).then(response => {
      setPostDetail(response.data);
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
        <div className="col-md-12 post-content" dangerouslySetInnerHTML={{ __html: postDetail.content }}></div>
      </div>
    </div >
  );
};
