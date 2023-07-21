import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';

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
    title: '名称',
    dataIndex: 'title',
    sorter: (a, b) => a.title.localeCompare(b.title)
  },
  {
    title: '拥有权限',
    dataIndex: 'permission',
    sorter: (a, b) => a.permission.localeCompare(b.permission)
  },
  {
    title: '操作',
    dataIndex: 'options',
    width: 150,
    fixed: 'right',
    render: (options, props) => (
      <div>
        {options.map((option, index) => {
          if (option.link) {
            return (
              // <Tag key={index}>
              //   <NavLink to={`${option.link + props.key}`}>
              //     <i className={`${option.icon} `} aria-hidden="true" />
              //   </NavLink>
              // </Tag>
              <></>
            );
          } else {
            return (
              // <Tag key={index}>
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
    <div className="role-table-container">
      <form className="form-vertical" role="form">
        <div className="row">
          <div className="col-md-11">
            <div className="input-group">
              <input name="searchStr" className="form-control" type="text" placeholder="角色名称" />
              <span className="input-group-btn">
                <button className="btn btn-default" type="button" >
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </span>
            </div>
          </div>
          <div className="col-md-1">
            <div className="input-group pull-right">
              <button className="btn btn-primary" type="button" >
                <i className="pi pi-plus" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="row">
        <div className="col-md-12">
          <div className="role-item-container">
            {/* 数据表格 */}
          </div>
        </div>
      </div>
    </div>
  );
};