import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import postService from 'src/app/service/post-service';
import './index.scss';

export default props => {
  const { id } = useParams()
  const [postDetail, setPostDetail] = useState({});
  const [imgFile0, setImgFile0] = useState({});
  const [titleImgURL, setTitleImgURL] = useState("");

  useEffect(() => {
    postService.getPostDetail(id).then(response => {
      let postDetailTemp = response.data;
      setPostDetail(postDetailTemp);

      const imgFile0 = postDetailTemp?.fileUploadEntities[0];
      const titleImgURL = imgFile0?.id ? `/cms/file/download/${imgFile0.id}` : "";
      setImgFile0(imgFile0);
      setTitleImgURL(titleImgURL);
    });
  }, []);

  return (
    <div className="post-detail-container">
      <div className="img-container">
        {
          titleImgURL ? <img src={titleImgURL} alt={imgFile0?.fileName} /> : <></>
        }
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
