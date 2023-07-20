import React, { FC, useState } from 'react';
import { Table, Tag } from 'antd';
import { NavLink } from 'react-router-dom';
const RoleTable: FC = () => {
  const columns = [
    {
      title: '序号',
      dataIndex: 'key',
      filters: [
        { text: '1', value: '1' },
        { text: '2', value: '2' }
      ],
      onFilter: (value: any, record: any) => record.key.includes(value),
      sorter: (a: any, b: any) => a.key - b.key
    },
    {
      title: '名称',
      dataIndex: 'title',
      sorter: (a: any, b: any) => a.title.localeCompare(b.title)
    },
    {
      title: '拥有权限',
      dataIndex: 'permission',
      sorter: (a: any, b: any) => a.permission.localeCompare(b.permission)
    },
    {
      title: '操作',
      dataIndex: 'options',
      width: 150,
      fixed: 'right' as any,
      render: (options: any, props: any) => (
        <div>
          {options.map((option: any, index: any) => {
            if (option.link) {
              return (
                <Tag key={index}>
                  <NavLink to={`${option.link + props.key}`}>
                    <i className={`${option.icon} `} aria-hidden="true" />
                  </NavLink>
                </Tag>
              );
            } else {
              return (
                <Tag key={index}>
                  <a>
                    <i className={`${option.icon} `} aria-hidden="true" />
                  </a>
                </Tag>
              );
            }
          })}
        </div>
      )
    }
  ];
  const [data] = useState([
    {
      key: '1',
      title: '游客',
      permission: '阅读文章',
      options: [{ icon: 'fa fa-pencil-square-o', link: '/manage/role-edit/' }, { icon: 'fa fa-trash' }]
    },
    {
      key: '2',
      title: '注册用户',
      permission: '发表文章、删除文章、发表评论、删除评论、更新个人资料、修改自己密码',
      options: [{ icon: 'fa fa-pencil-square-o', link: '/manage/role-edit/' }, { icon: 'fa fa-trash' }]
    },
    {
      key: '3',
      title: '系统管理员',
      permission: 'All',
      options: [{ icon: 'fa fa-pencil-square-o', link: '/manage/role-edit/' }, { icon: 'fa fa-trash' }]
    }
  ]);
  return (
    <div className="role-table-container">
      <form role="form">
        <div className="row">
          <div className="col-sm-8">
            <div className="input-group">
              <input className="form-control" type="text" placeholder="角色名称，角色代码" />
              <span className="input-group-btn">
                <button className="btn btn-primary" type="button">
                  <i className="fa fa-search" aria-hidden="true" />
                  搜索
                </button>
              </span>
            </div>
          </div>
          <div className="col-sm-4 ">
            <div className="input-group pull-right">
              <button className="btn btn-primary" type="button">
                <i className="fa fa-user" aria-hidden="true" />
                创建角色
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="row mt-16px ">
        <div className="col-md-12">
          <Table dataSource={data} columns={columns} scroll={{ x: 650 }} />
        </div>
      </div>
    </div>
  );
};
export default RoleTable;
