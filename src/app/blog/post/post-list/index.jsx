import React, { useState, useEffect, useCallback } from 'react';
import PostHeadline from 'src/app/blog/post/post-headline';
import { NavLink } from 'react-router-dom';
import { Paginator } from 'primereact/paginator';

import listImg from 'src/assets/images/list-item.jpg';
import './index.scss';

//mock-data
import postListsMock from "src/mock-data/post-list-mock.json";

const currentPage = 1
const itemPerPage = 10;

export default props => {
  const [list, updateList] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const loadData = useCallback((page = 1, itemPerPage = 10) => {
    const offset = (page - 1) * 10;
    const end = page * itemPerPage;
    const data = postListsMock.content.slice(offset, end > postListsMock.totalElements ? postListsMock.totalElements : end);
    updateList(data);
  }, []);

  useEffect(() => {
    loadData(currentPage, itemPerPage);
  }, []);

  return (
    <>
      <PostHeadline />
      <div className="post-list-container">
        <div className="row">
          <div className="col-md-12">
            {list.map((item, index) => {
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
              <Paginator first={first} rows={rows} totalRecords={postListsMock.totalElements} onPageChange={onPageChange}></Paginator>
            </div>
          </div>
        </div >
      </div >
    </>
  );
};
