import React, { useState, useEffect } from 'react';
import formatTimeAgo from 'src/app/shared/date-formater';
import { NavLink, useNavigate } from 'react-router-dom';
import './index.scss';

export default props => {
  //导航对象
  const navigate = useNavigate();

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
    if (imgs && imgs.length) {
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
    }
  }, []);

  return (
    <section className='post-list-item'>
      {
        videoURL ?
          <video
            muted
            style={{
              width: "100%",
              height: "auto",
              cursor: "pointer",
            }}
            onMouseEnter={e => { e.target.play(); }}
            onMouseLeave={e => { e.target.pause(); }}
            onClick={e => { navigate(`/post/post-detail/${postDetail.postId}`); }}
          >
            <source src={videoURL} />
          </video>
          :
          <img
            alt={media0?.name || ""}
            role="presentation"
            src={`${titleImgURL}`}
            onClick={e => { navigate(`/post/post-detail/${postDetail.postId}`); }}
          />
      }
      <div className='list-item-footer'>
        <NavLink
          to={`/post/post-detail/${postDetail.postId}`}
          dangerouslySetInnerHTML={
            { __html: (postDetail.content + "").trim().substring(0, 16) }
          }
        >
        </NavLink>
        <div className='sub-footer'>
          <NavLink
            to={`/user-home/${postDetail.userId}`}
          >
            @{(postDetail.nickName + "").trim().substring(0, 16)}
          </NavLink>
          <span>{formatTimeAgo(postDetail.postTime)}</span>
        </div>
      </div>
    </section>
  );
};
