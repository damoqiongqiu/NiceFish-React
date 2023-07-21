import React, { useState } from 'react';
import './index.scss';
import postList from "src/mock-data/post-list-mock.json";

const columns = [
  {
    title: '序号',
    dataIndex: 'key',
    filters: [
      { text: '1', value: '1' },
      { text: '2', value: '2' }
    ],
    onFilter: (value, record) => record.key.includes(value),
    sorter: (a, b) => a.key - b.key
  },
  {
    title: '内容',
    dataIndex: 'content',
    sorter: (a, b) => a.content.length - b.content.length
  },
  {
    title: '用户',
    dataIndex: 'userName',
    sorter: (a, b) => a.userName.localeCompare(b.userName)
  },
  {
    title: '日期',
    dataIndex: 'time',
    width: 182,
    fixed: 'right',
    sorter: (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
  }
];

export default props=> {
  return (
    <div className="comment-table-container">
      <form className="form-vertical" role="form">
        <div className="row">
          <div className="col-md-12">
            <div className="input-group">
              <input name="searchStr" className="form-control" type="text" placeholder="内容" />
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
          <div className="comment-item-container">
            {/* 数据表格 */}
          </div>
        </div>
      </div>
    </div>
  );
};
