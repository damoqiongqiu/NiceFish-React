import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import defaultImg from 'src/assets/images/1.jpg';
import './index.scss';

export default props => {
  const [postDetail, setPostDetail] = useState(props.postDetail);
  const imgFile0 = postDetail.fileUploadEntities[0];
  const titleImgURL = imgFile0?.id ? `/cms/file/download/${imgFile0.id}` : "";

  return (
    <section className='post-list-item'>
      <NavLink
        to={`/post/post-detail/${postDetail.postId}`}
      >
        <img
          alt={imgFile0?.name || "图片"}
          role="presentation"
          src={`${titleImgURL || defaultImg}`}
        />
      </NavLink>
      <div className='list-item-footer'>
        <NavLink to={`/post/post-detail/${postDetail.postId}`}>{postDetail.title}</NavLink>
        <NavLink to={`/post/post-detail/${postDetail.postId}`}>@{postDetail.nickName}</NavLink>
      </div>
    </section>
  );
};
