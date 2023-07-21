import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
    onFilter: (value, record) => {
      console.log(value, record);
      return record.key.includes(value);
    },
    sorter: (a, b) => a.key - b.key
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    sorter: (a, b) => a.userName.localeCompare(b.userName)
  },
  {
    title: '注册时间',
    dataIndex: 'registerTime',
    sorter: (a, b) => new Date(a.registerTime).getTime() - new Date(b.registerTime).getTime()
  },
  {
    title: '最后登录',
    dataIndex: 'lastLoginTime',
    sorter: (a, b) => new Date(a.lastLoginTime).getTime() - new Date(b.lastLoginTime).getTime()
  },
  {
    title: '操作',
    dataIndex: 'options',
    width: 100,
    fixed: 'right',
    render: (options, props) => (
      <div>
        {options.map((option, index) => {
          if (option.link) {
            return (
              // <Tag key={index} className="mb-1">
              //   <NavLink to={`${option.link + props.key}`}>
              //     <i className={`${option.icon} `} aria-hidden="true" />
              //   </NavLink>
              // </Tag>
              <></>
            );
          } else {
            return (
              // <Tag key={index} className="mb-1">
              //   <a>
              //     <i className={`${option.icon} `} aria-hidden="true" />
              //   </a>
              // </Tag>
              <></>
            );
          }
        })}
      </div>
    )
  }
];

export default props => {
  return (
    <div className="user-table-container">
      <form className="form-vertical" role="form">
        <div className="row">
          <div className="col-md-11">
            <div className="input-group">
              <input name="searchStr" className="form-control" type="text" placeholder="用户名，手机号" />
              <span className="input-group-btn">
                <button className="btn btn-default" type="button">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </span>
            </div>
          </div>
          <div className="col-md-1">
            <div className="input-group pull-right">
              <button className="btn btn-primary" type="button">
                <i className="pi pi-plus" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="row">
        <div className="col-md-12">
          <div className="user-item-container">
            {/* 数据表格 */}
          </div>
        </div>
      </div>
    </div>
  );
};
