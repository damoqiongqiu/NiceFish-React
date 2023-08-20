import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';

export default props => {
  //文章详情
  const postDetail = props.postDetail;

  //视频 URL 地址
  const [videoURL, setVideoURL] = useState(null);

  //第0个媒体元素
  const [media0, setMedia0] = useState(null);

  //标题图片 URL 地址
  const [titleImgURL, setTitleImgURL] = useState(null);

  useEffect(() => {
    let imgs = postDetail.fileUploadEntities;
    let temp = [];
    for (let item of imgs) {
      if (item.fileSuffix === 'mp4') {//TODO: 增加视频格式
        setVideoURL(`/cms/file/download/${item.id}`);
        break;
      } else {
        setMedia0(item);
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
            <video
              muted
              style={{
                width: " 100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              }}
              onMouseEnter={e => { e.target.play(); }}
              onMouseLeave={e => { e.target.pause(); }}
            >
              <source src={videoURL} />
            </video>
            :
            <img
              alt={media0?.name || ""}
              role="presentation"
              src={`${titleImgURL}`}
            />
        }
      </NavLink>
      <div className='list-item-footer'>
        <NavLink to={`/post/post-detail/${postDetail.postId}`}>
          {(postDetail.content + "").trim().substring(0, 16)}
        </NavLink>
        <NavLink to={`/user-home/${postDetail.userId}`}>
          @{(postDetail.nickName + "").trim().substring(0, 16)}
          &nbsp;&nbsp;&nbsp;&nbsp;
          {postDetail.postTime}
        </NavLink>
      </div>
    </section >
  );
};
