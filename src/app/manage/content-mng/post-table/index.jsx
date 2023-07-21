import React, { useState } from 'react';
import './index.scss';

import postList from "src/mock-data/post-list-mock.json";

const columns = [
  {
    title: '序号',
    dataIndex: 'postId',
    width: 100,
    fixed: 'left',
    filters: [
      { text: '1', value: '1' },
      { text: '2', value: '2' }
    ],
    onFilter: (value, record) => record.postId.includes(value),
    sorter: (a, b) => a.postId - b.postId
  },
  {
    title: '标题',
    dataIndex: 'title',
    sorter: (a, b) => a.title.localeCompare(b.title)
  },
  {
    title: '作者',
    dataIndex: 'userName',
    sorter: (a, b) => a.userName.localeCompare(b.userName)
  },
  {
    title: '日期',
    width: 180,
    fixed: 'right',
    dataIndex: 'postTime',
    sorter: (a, b) => new Date(a.postTime).getTime() - new Date(b.postTime).getTime()
  }
];

export default props => {
  return (
    <div className="post-table-container">
      <form className="form-vertical" role="form">
        <div className="row">
          <div className="col-md-12">
            <div className="input-group">
              <input name="searchStr" className="form-control" type="text" placeholder="标题" />
              <span className="input-group-btn">
                <button className="btn btn-default" type="button">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </span>
            </div>
          </div>
        </div>
      </form>
      <div className="row">
        <div className="col-md-12">
          <div className="post-item-container">
            {/* 数据表格 */}
          </div>
        </div>
      </div>
    </div>
  );
};
