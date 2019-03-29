import * as React from "react";
import {useState} from 'react';
import {Table} from 'antd';
function UserTable() {
    const columns = [
        {
          title: "序号",
          dataIndex: "key"
        },
        {
          title: "用户名",
          dataIndex: "userName"
        },
        {
          title: "注册时间",
          dataIndex: "registerTime"
        },
        {
          title: "最后登录",
          dataIndex: "lastLoginTime"
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
        { key: '1', userName: 'damoqiongqiu@126.com', registerTime:'2010-11-11 11:11', lastLoginTime:'2016-11-27 09:34',options:[{icon:'fa fa-pencil-square-o'},{icon:'fa fa-lock'}, {icon:'fa fa-trash'},{icon:'fa fa-user-secret'}]},
        ]
      );
  return (
    <div className="user-table-container">
      <form  role="form">
        <div className="row">
          <div className="col-md-10">
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="用户名，昵称"
              />
              <span className="input-group-btn">
                <button className="btn btn-default" type="button">
                  <i className="fa fa-search" />
                  搜索
                </button>
              </span>
            </div>
          </div>
          <div className="col-md-2">
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
          <Table dataSource={data} columns={columns}></Table>
        </div>
      </div>
    </div>
  );
}
export default UserTable;
