import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

import './index.scss';

import compPermListMock from "src/mock-data/component-permission-list.json";

export default props => {
  const navigate = useNavigate();
  const [compPermList, setCompPermList] = useState([]);

  useEffect(() => {
    //FIXME:load data from server.
    setCompPermList(compPermListMock.content);
  }, []);

  const operationTemplate = (item) => {
    return (
      <>
        <Button icon="pi pi-pencil" className="p-button-success" onClick={() => { navigate("/manage/permission/component-permission-edit/" + item.compPermId) }} />&nbsp;&nbsp;
        <Button icon="pi pi-trash" className="p-button-danger" />
      </>
    );
  };

  return (
    <div className="component-permission-table-container">
      <form className="form-vertical" role="form">
        <div className="row">
          <div className="col-md-11">
            <div className="input-group">
              <input name="searchStr" className="form-control" type="text" placeholder="组件名称或者权限字符串" />
              <span className="input-group-btn">
                <button className="btn btn-default" type="button">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </span>
            </div>
          </div>
          <div className="col-md-1">
            <div className="input-group pull-right">
              <button className="btn btn-primary" type="button" onClick={() => { navigate("/manage/permission/component-permission-edit/-1") }}>
                <i className="pi pi-plus" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="row">
        <div className="col-md-12">
          <div className="permission-item-container">
            {/* FIXME:组件改成带有层级结构的 TreeTable */}
            <DataTable value={compPermList} paginator rows={20} showGridlines stripedRows tableStyle={{ width: "100%" }}>
              <Column field="componentName" header="组件名称"></Column>
              <Column field="url" header="URL"></Column>
              <Column field="displayOrder" header="现实顺序"></Column>
              <Column field="permission" header="权限通配符" style={{ maxWidth: "120px" }}></Column>
              <Column field="visiable" header="是否可见"></Column>
              <Column field="" header="操作" body={operationTemplate}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};
