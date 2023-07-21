import React, { useState, useEffect, useCallback } from 'react';
import PostHeadline from 'src/app/blog/read/post-headline';
import { NavLink } from 'react-router-dom';
import listImg from 'src/assets/images/list-item.jpg';
import './index.scss';

//mock-data
import postLists from "src/mock-data/post-list-mock.json";

const currentPage = 1
const itemPerPage = 10;

const PostList = () => {
  const [list, updateList] = useState([]);

  const onChange = useCallback((page) => {
    loadData(page);
  }, []);

  const ShowSizeChange = useCallback((current, pageSize) => {
    loadData(current, pageSize);
  }, []);

  const loadData = useCallback((page = 1, itemPerPage = 10) => {
    const offset = (page - 1) * 10;
    const end = page * itemPerPage;
    const data = postLists.content.slice(offset, end > postLists.totalElements ? postLists.totalElements : end);
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
        </div >
      </div >
    </>
  );
};
export default PostList;
