import React from 'react';
import headImgNarrow from 'src/assets/images/headline-narrow.png';
import './index.scss';

const PostHeadline = () => {
  return (
    <div className="post-headline-container">
      <div className="img-container">
        <img src={headImgNarrow} alt="光刻机" />
      </div>
      <div className="post-headline-details">
        <a href="#">
          <h3>光刻机技术需要长时间的技术积累才能做</h3>
        </a>
        <ul className="user-info">
          <li><a href="#"><span className="lnr lnr-user"></span>作者</a></li>
          <li><a href="#"><span className="lnr lnr-calendar-full"></span>2019-03-24</a></li>
        </ul>
      </div>
    </div>
  );
};
export default PostHeadline;
