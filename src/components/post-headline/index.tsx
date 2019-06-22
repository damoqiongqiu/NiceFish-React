import * as React from "react";
import * as headImgWide from "../../assets/images/headline-wide.png";
import * as headImgNarrow from "../../assets/images/headline-narrow.png";
import styles from "./index.scss";

function PostHeadline() {
  return (
    <div className={styles['post-headline-container']}>
      <div className={'img-container'}>
        <picture>
          <source srcSet={headImgWide} media="(min-width:600px)" />
          <img src={headImgNarrow} alt="光刻机" />
        </picture>
      </div>
      <div className={styles['post-headline-details']}>
        <a href="#">
          <h3>光刻机技术需要长时间的技术积累才能做</h3>
        </a>
        <ul className={styles['user-info']}>
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
