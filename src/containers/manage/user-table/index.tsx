import React, { useState } from "react";
import { Table, Tag } from "antd";
import { NavLink } from "react-router-dom";
const UserTable = () => {
  const columns = [
    {
      title: "序号",
      dataIndex: "key",
      filters: [
        { text: "1", value: "1" },
        { text: "2", value: "2" },
      ],
      onFilter: (value: any, record: any) => {
        console.log(value, record);
        return record.key.includes(value);
      },
      sorter: (a: any, b: any) => a.key - b.key,
    },
    {
      title: "用户名",
      dataIndex: "userName",
      sorter: (a: any, b: any) => a.userName.localeCompare(b.userName),
    },
    {
      title: "注册时间",
      dataIndex: "registerTime",
      sorter: (a: any, b: any) =>
        new Date(a.registerTime).getTime() - new Date(b.registerTime).getTime(),
    },
    {
      title: "最后登录",
      dataIndex: "lastLoginTime",
      sorter: (a: any, b: any) =>
        new Date(a.lastLoginTime).getTime() -
        new Date(b.lastLoginTime).getTime(),
    },
    {
      title: "操作",
      dataIndex: "options",
      width: 100,
      fixed: "right" as any,
      render: (options: any, props: any) => (
        <div>
          {options.map((option: any, index: any) => {
            if (option.link) {
              return (
                <Tag key={index} className="mb-1">
                  <NavLink to={`${option.link + props.key}`}>
                    <i className={`${option.icon} `} aria-hidden="true" />
                  </NavLink>
                </Tag>
              );
            } else {
              return (
                <Tag key={index} className="mb-1">
                  <a>
                    <i className={`${option.icon} `} aria-hidden="true" />
                  </a>
                </Tag>
              );
            }
          })}
        </div>
      ),
    },
  ];
  const [data] = useState([
    {
      key: "1",
      userName: "damoqiongqiu@126.com",
      registerTime: "2010-11-11 11:11",
      lastLoginTime: "2016-11-27 09:34",
      options: [
        { icon: "fa fa-pencil-square-o", link: "/manage/user-table/edituser/" },
        { icon: "fa fa-lock" },
        { icon: "fa fa-trash" },
        { icon: "fa fa-user-secret" },
      ],
    },
    {
      key: "2",
      userName: "yanyunchangfeng@gmail.com",
      registerTime: "2011-11-11 11:11",
      lastLoginTime: "2018-11-15 09:34",
      options: [
        { icon: "fa fa-pencil-square-o", link: "/manage/user-table/edituser/" },
        { icon: "fa fa-lock" },
        { icon: "fa fa-trash" },
        { icon: "fa fa-user-secret" },
      ],
    },
  ]);
  return (
    <div className="user-table-container">
      <form role="form">
        <div className="row">
          <div className="col-sm-8">
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="用户名，昵称"
              />
              <span className="input-group-btn">
                <button className="btn btn-primary" type="button">
                  <i className="fa fa-search" />
                  搜索
                </button>
              </span>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="input-group pull-right">
              <button className="btn btn-primary" type="button">
                <i className="fa fa-user" aria-hidden="true" />
                创建用户
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="row mt-16px">
        <div className="col-md-12">
          <Table dataSource={data} columns={columns} scroll={{ x: 690 }} />
        </div>
      </div>
    </div>
  );
};
export default UserTable;
