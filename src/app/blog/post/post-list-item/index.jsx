import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';

export default props => {
  const [postDetail, setPostDetail] = useState(props.postDetail);
  const imgFile0 = postDetail?.fileUploadEntities[0];
  const titleImgURL = imgFile0?.id ? `/cms/file/download/${imgFile0?.id}` : "";

  return (
    <section className='post-list-item'>
      <NavLink
        to={`/post/post-detail/${postDetail.postId}`}
      >
        {
          titleImgURL ?
            <img
              alt={imgFile0?.name || "图片"}
              role="presentation"
              src={`${titleImgURL}`}
            />
            :
            <></>
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
