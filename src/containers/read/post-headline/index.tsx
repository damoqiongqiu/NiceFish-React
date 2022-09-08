import React from "react";
import headImgWide from "src/assets/images/headline-wide.png";
import headImgNarrow from "src/assets/images/headline-narrow.png";
import "./index.scss";

function PostHeadline() {
  return (
    <div className="post-headline-container">
      <div className="img-container">
        <picture>
          <source srcSet={headImgWide} media="(min-width:600px)" />
          <img src={headImgNarrow} alt="光刻机" />
        </picture>
      </div>
      <div className="post-headline-details">
        <a href="#">
          <h3>光刻机技术需要长时间的技术积累才能做</h3>
        </a>
        <ul className="user-info">
          <li>
            <a href="#">
              <span className="lnr lnr-user" />
              作者
            </a>
          </li>
          <li>
            <a href="#">
              <span className="lnr lnr-calendar-full" />
              2019-03-24
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PostHeadline;
