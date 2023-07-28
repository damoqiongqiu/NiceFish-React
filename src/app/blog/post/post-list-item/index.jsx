import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import bgImg from 'src/assets/images/1.jpg';
import './index.scss';

export default props => {
  const [postDetail, setPostDetail] = useState(props.postDetail);

  return (
    <section className='post-list-item'>
      <NavLink
        to={`/post/post-detail/${postDetail.postId}`}
        style={{
          background: ` url(${bgImg}) left top 100% /100% no-repeat`
        }}
      ></NavLink>
      <div className='list-item-footer'>
        <NavLink to={`/post/post-detail/${postDetail.postId}`}>{postDetail.title}</NavLink>
        <NavLink to={`/post/post-detail/${postDetail.postId}`}>@{postDetail.nickName}</NavLink>
      </div>
    </section>
  );
};
