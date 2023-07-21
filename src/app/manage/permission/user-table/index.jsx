import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import './index.scss';
import userListMock from "src/mock-data/user-list-mock.json";


export default props => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    //FIXME:load data from server.
    setUserList(userListMock.content);
  }, []);

  const statusTemplate = (item) => {
    return (
      item.status == 0 ?
        <span className="label label-danger">禁用</span> :
        <span className="label label-success">正常</span>
    );
  };

  const roleListTemplate = (item) => {
    return (
      item?.roleEntities?.map(role => (
        <h5 key={role.roleId}>
          <span className="label label-success">{role.roleName}</span>
        </h5>
      ))
    );
  };

  const operationTemplate = (item) => {
    return (
      <>
        <Button icon="pi pi-pencil" className="p-button-success" />&nbsp;&nbsp;
        <Button icon="pi pi-trash" className="p-button-danger" />
      </>
    );
  };

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
            <DataTable value={userList} paginator rows={20} showGridlines stripedRows tableStyle={{ width: "100%" }}>
              <Column field="userName" header="用户名"></Column>
              <Column field="nickName" header="昵称"></Column>
              <Column field="status" body={statusTemplate} header="状态"></Column>
              <Column field="email" header="email"></Column>
              <Column field="cellphone" header="手机号"></Column>
              <Column field="createTime" header="注册时间"></Column>
              <Column field="roleEntities" body={roleListTemplate} header="角色列表"></Column>
              <Column field="" header="操作" body={operationTemplate}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};
