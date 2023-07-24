import React, { useState, useEffect, useCallback } from 'react';
import PostHeadline from 'src/app/blog/post/post-headline';
import { NavLink } from 'react-router-dom';
import { Paginator } from 'primereact/paginator';
import listImg from 'src/assets/images/list-item.jpg';

import postService from 'src/app/blog/post/post-service';
import './index.scss';

export default props => {
  const [postList, setPostList] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

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
                            <span className="ml-5px">{item.nickName}</span>
                          </div>
                          <div className="col-md-6 col-lg-5">
                            <span className="fa fa-clock-o"></span>
                            <span className="ml-5px">{item.postTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="abs"
                        dangerouslySetInnerHTML={{ __html: (item.content || "").substring(0, 140) + "..." }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div >
          <div className="row">
            <div className="col-md-12">
              <Paginator first={first} rows={rows} totalRecords={totalElements} onPageChange={onPageChange}></Paginator>
            </div>
          </div>
        </div >
      </div >
    </>
  );
};
