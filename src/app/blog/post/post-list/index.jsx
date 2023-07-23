import React, { useState, useEffect, useCallback } from 'react';
import PostHeadline from 'src/app/blog/post/post-headline';
import { NavLink } from 'react-router-dom';
import { Paginator } from 'primereact/paginator';
import listImg from 'src/assets/images/list-item.jpg';

import postService from 'src/app/blog/post/post-service';
import './index.scss';

const currentPage = 1
const itemPerPage = 10;

export default props => {
  const [postList, updatePostList] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  useEffect(() => {
    //TODO:fix 这些分页参数
    let page = 1;
    let itemPerPage = 10
    const offset = (page - 1) * 10;
    const end = page * itemPerPage;
    postService.getPostList().then(response => {
      console.log(response);
      let data = response.data;
      data = data.content.slice(offset, end > data.totalElements ? data.totalElements : end);
      updatePostList(data);
    });
  }, []);

  return (
    <>
      <PostHeadline />
      <div className="post-list-container">
        <div className="row">
          <div className="col-md-12">
            {postList.map((item, index) => {
              return (
                <div className="post-item-container" key={item.postId}>
                  <div className="row">
                    <div className="col-md-2">
                      <img src={listImg} alt="..." className="img-thumbnail" />
                    </div>
                    <div className="col-md-10 post-item-text-container">
                      <h3>
                        <NavLink to={`/post/post-detail/${item.postId}`}>{item.title}</NavLink>
                      </h3>
                      <div className="user-name-intitle">
                        <div className="row">
                          <div className="col-md-4 col-lg-3 ">
                            <span className="fa fa-user"></span>
                            <span className="ml-5px">{item.userName}</span>
                          </div>
                          <div className="col-md-6 col-lg-5">
                            <span className="fa fa-clock-o"></span>
                            <span className="ml-5px">{item.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="abs">{item.content}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div >
          <div className="row">
            <div className="col-md-12">
              <Paginator first={first} rows={rows} totalRecords={postList.totalElements} onPageChange={onPageChange}></Paginator>
            </div>
          </div>
        </div >
      </div >
    </>
  );
};
