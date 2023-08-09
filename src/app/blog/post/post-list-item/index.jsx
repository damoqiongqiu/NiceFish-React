import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';

export default props => {
  const postDetail = props.postDetail;
  const [videoURL, setVideoURL] = useState(null);
  const [imgFile0, setImgFile0] = useState(null);
  const [titleImgURL, setTitleImgURL] = useState(null);

  useEffect(() => {
    let imgs = postDetail.fileUploadEntities;
    let temp = [];
    for (let item of imgs) {
      if (item.fileSuffix === 'mp4') {//TODO: 增加视频格式
        setVideoURL(`/cms/file/download/${item.id}`);
        break;
      } else {
        setImgFile0(item);
        setTitleImgURL(item?.id ? `/cms/file/download/${item?.id}` : "");
        break;
      }
    }
  }, []);

  return (
    <section className='post-list-item'>
      <NavLink
        to={`/post/post-detail/${postDetail.postId}`}
      >
        {
          videoURL ?
            <video controls style={{
              width: " 100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0
            }}>
              <source src={videoURL} />
            </video>
            :
            <img
              alt={imgFile0?.name || "图片"}
              role="presentation"
              src={`${titleImgURL}`}
            />
        }
      </NavLink>
      <div className='list-item-footer'>
        <NavLink to={`/post/post-detail/${postDetail.postId}`}>
          {(postDetail.content + "").trim().substring(0, 16)}
        </NavLink>
        <NavLink to={`/post/post-detail/${postDetail.postId}`}>
          @{(postDetail.nickName + "").trim().substring(0, 16)}
          &nbsp;&nbsp;&nbsp;&nbsp;
          {postDetail.postTime}
        </NavLink>
      </div>
    </section>
  );
};
