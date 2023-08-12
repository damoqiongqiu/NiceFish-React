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

  useEffect(() => {
    postService.getPostList(page).then(response => {
      let data = response.data;
      setTotalElements(data.totalElements);

      data = data?.content || [];
      setPostList(data);
    });
  }, []);

  return (
    <>
      {/* TODO:抽成组件，实现业务逻辑 */}
      <div className='tag-list-container'>
        <h4>
          <a className="label label-default">推荐</a>
        </h4>
        <h4>
          <a className="label label-default">美食</a>
        </h4>
        <h4>
          <a className="label label-default">电影</a>
        </h4>
        <h4>
          <a className="label label-default">音乐</a>
        </h4>
        <h4>
          <a className="label label-default">健身</a>
        </h4>
        <h4>
          <a className="label label-default">旅行</a>
        </h4>
      </div>
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
    </>
  );
};
