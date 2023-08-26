import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostListItem from 'src/app/blog/post/post-list-item';
import postService from 'src/app/service/post-service';
import './index.scss';

export default props => {
  //文章列表
  const [postList, setPostList] = useState([]);

  //滚动加载，是否还有更多数据
  const [hasMore, setHasMore] = useState(true);

  //分页参数
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(20);
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  /**
   * 加载文章列表
   */
  const fetchMoreData = async () => {
    let temp = page + 1;
    setPage(temp);

    await postService.getPostList(temp, rows).then(response => {
      let data = response.data;
      setTotalElements(data.totalElements);

      setHasMore(!data.last);

      data = data?.content || [];
      setPostList([...postList, ...data]);
    });
  }

  useEffect(() => {
    fetchMoreData();
  }, []);

  /**
   * 瀑布流布局响应式断点
   * 这里需要与 Bootstrap 的断点对应
   */
  const breakpointColumnsObj = {
    default: 4,
    1200: 4,
    992: 3,
    768: 2,
    576: 1,
  };

  return (
    <div className='post-list-container'>
      <InfiniteScroll
        dataLength={postList.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        style={{ overflow: "inherit" }}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          {
            postList.map((item, index) => {
              return (
                <PostListItem postDetail={item} key={index}></PostListItem>
              );
            })
          }
        </Masonry>
      </InfiniteScroll>
    </div >
  );
};
