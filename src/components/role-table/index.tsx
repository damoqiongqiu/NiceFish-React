import * as React from "react";
import {useState} from 'react';
import {Table} from 'antd';
function RoleTable() {
    const columns = [
        {
          title: "序号",
          dataIndex: "key"
        },
        {
          title: "名称",
          dataIndex: "title"
        },
        {
          title: "拥有权限",
          dataIndex: "permission"
        },
        {
          title: "操作",
          dataIndex: "options",
          render: (options:any) => (
             options.map((option:any,index:any)=>{
                 return ( <a key={index} ><i className={`${option.icon} ${index!==0 ?'ml-16px':''} align-self-center`}
                 aria-hidden="true"></i></a>)
             })
          ),
        },
    
      ];
      const [data] = useState(
       [
        { key: '1', title: '游客', permission: '阅读文章' ,options:[{icon:'fa fa-pencil-square-o'}, {icon:'fa fa-trash'}]},
        { key: '2', title: '注册用户', permission: '发表文章、删除文章、发表评论、删除评论、更新个人资料、修改自己密码',options:[{icon:'fa fa-pencil-square-o'}, {icon:'fa fa-trash'}]},
        { key: '3', title: '系统管理员', permission: 'All',options:[{icon:'fa fa-pencil-square-o'}, {icon:'fa fa-trash'}]},
        ]
      );
  return (
    <div className="role-table-container">
      <form role="form">
        <div className="row">
          <div className="col-md-10">
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="角色名称，角色代码"
              />
              <span className="input-group-btn">
                <button className="btn btn-default" type="button">
                  <i className="fa fa-search" aria-hidden="true" />
                  搜索
                </button>
              </span>
            </div>
          </div>
          <div className="col-md-2">
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
       
               
    <Table dataSource={data} columns={columns}></Table>
        </div>
      </div>
    </div>
  );
}
export default RoleTable;
