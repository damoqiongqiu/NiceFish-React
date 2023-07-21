import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

import './index.scss';

import apiPermListMock from "src/mock-data/api-permission-list-mock.json";

export default props => {
  const navigate = useNavigate();
  const [apiList, setApiList] = useState([]);

  useEffect(() => {
    //FIXME:load data from server.
    setApiList(apiPermListMock.content);
  }, []);

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
        <Button icon="pi pi-pencil" className="p-button-success" onClick={() => { navigate("/manage/permission/api-permission-edit/" + item.apiPermissionId) }} />&nbsp;&nbsp;
        <Button icon="pi pi-trash" className="p-button-danger" />
      </>
    );
  };

  return (<div className="api-permission-table-container">
    <form className="form-vertical" role="form">
      <div className="row">
        <div className="col-md-11">
          <div className="input-group">
            <input name="searchStr" className="form-control" type="text" placeholder="API 名称或者权限字符串" />
            <span className="input-group-btn">
              <button className="btn btn-default" type="button">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </span>
          </div>
        </div>
        <div className="col-md-1">
          <div className="input-group pull-right">
            <button className="btn btn-primary" type="button" onClick={() => { navigate("/manage/permission/api-permission-edit/-1") }} >
              <i className="pi pi-plus" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </form>
    <div className="row">
      <div className="col-md-12">
        <div className="permission-item-container">
          <DataTable value={apiList} paginator rows={20} showGridlines stripedRows tableStyle={{ width: "100%" }}>
            <Column field="apiName" header="API 名称"></Column>
            <Column field="url" header="URL"></Column>
            <Column field="permission" header="权限通配符"></Column>
            <Column field="remark" header="备注" style={{ maxWidth: "120px" }}></Column>
            <Column field="roleEntities" body={roleListTemplate} header="已关联角色"></Column>
            <Column field="" header="操作" body={operationTemplate}></Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
  );
};
