import React, { useState, useEffect, useCallback } from 'react';
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

  return (
    <div className='post-list-container'>
      {postList.map((item, index) => {
        return (
          <PostListItem postDetail={item} key={index}></PostListItem>
        );
      })}
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </div>
  );
};
