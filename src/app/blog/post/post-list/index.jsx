import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import PostListItem from 'src/app/blog/post/post-list-item';
import postService from 'src/app/service/post-service';
import './index.scss';

export default props => {
  //文章列表
  const [postList, setPostList] = useState([]);

  //分页参数
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  /**
   * 分页事件
   * @param {*} event 
   */
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setPage(event.page + 1);
  };

  /**
   * 加载文章列表
   */
  useEffect(() => {
    postService.getPostList(page).then(response => {
      let data = response.data;
      setTotalElements(data.totalElements);

      data = data?.content || [];
      setPostList(data);
    });
  }, []);

  //瀑布流布局响应式断点 TODO:需要再优化一下
  const breakpointColumnsObj = {
    default: 5,
    1200: 4,
    992: 3,
    768: 2,
    576: 1
  };

  return (
    <div className='post-list-container'>
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
    </div>
  );
};
