import * as React from 'react';
import {useState} from 'react';
import {Table,Tag} from 'antd';
function PermissionTable(){
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
          title: "操作",
          dataIndex: "options",
          render: (options:any) => (
            <span>
            {
              options.map((option:any,index:any)=>{
                  return ( <Tag key={index} ><i className={`${option.icon} `}
                  aria-hidden="true"></i></Tag>)
              })
            }
            </span>
          ),
        },
    
      ];
      const [data] = useState(
       [
        { key: '1', title: '发表文章', userName: 'damoqiongqiu' ,options:[{icon:'fa fa-pencil-square-o'}, {icon:'fa fa-trash'}]},
        { key: '2', title: '删除文章', userName: 'damoqiongqiu',options:[{icon:'fa fa-pencil-square-o'}, {icon:'fa fa-trash'}]},
        ]
      );
    
    return (
        <div className="permission-table-container" >
  <form className="form-vertical" role="form">
    <div className="row">
      <div className="col-sm-8 ">
        <div className="input-group">
          <input className="form-control" type="text" placeholder="权限名称，权限代码"/>
          <span className="input-group-btn">
            <button className="btn btn-default" type="button"><i className="fa fa-search" aria-hidden="true"></i>
              搜索</button>
          </span>
        </div>
      </div>
      <div className="col-sm-4 ">
        <div className="input-group pull-right">
          <button className="btn btn-primary" type="button"><i className="fa fa-user" aria-hidden="true"></i>
            创建权限</button>
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
    )
}
export default PermissionTable