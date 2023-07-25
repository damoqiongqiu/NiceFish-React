import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { confirmDialog } from 'primereact/confirmdialog';
import roleSercice from "src/app/service/role-service";

import './index.scss';

export default props => {
  const navigate = useNavigate();
  const [roleList, setRoleList] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setPage(event.page + 1);
  };

  const loadData = () => {
    roleSercice.getRoleTable(page, "").then(response => {
      let data = response.data;
      setTotalElements(data.totalElements);

      data = data?.content || [];
      setRoleList(data);
    });
  };

  useEffect(loadData, []);

  const delRole = (rowData, ri) => {
    confirmDialog({
      message: '确定要删除吗？',
      header: '确认',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        roleSercice.deleteRole(rowData.roleId)
          .then(
            response => {
              niceFishToast({
                severity: 'success',
                summary: 'Success',
                detail: '删除成功',
              });
            },
            error => {
              niceFishToast({
                severity: 'error',
                summary: 'Error',
                detail: '删除失败',
              });
            }
          )
          .finally(loadData);
      },
      reject: () => {
        console.log("reject");
      }
    });
  }

  const statusTemplate = (item) => {
    return (
      item.status == 0 ?
        <span className="label label-danger">禁用</span> :
        <span className="label label-success">正常</span>
    );
  };

  const apiListTemplate = (item) => {
    return (
      item?.apiEntities?.map(api => (
        <h5 key={api.apiPermissionId}>
          <span className="label label-success">{api.apiName}</span>
        </h5>
      ))
    );
  };

  const componentListTemplate = (item) => {
    return (
      item?.componentEntities?.map(comp => (
        <h5 key={comp.compPermId}>
          <span className="label label-success">{comp.componentName}</span>
        </h5>
      ))
    );
  };

  const operationTemplate = (item) => {
    return (
      <>
        <Button icon="pi pi-pencil" className="p-button-success" onClick={() => { navigate("/manage/permission/role-edit/" + item.roleId) }} />&nbsp;&nbsp;
        <Button icon="pi pi-trash" className="p-button-danger" onClick={() => { delRole(item) }} />
      </>
    );
  };

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
              <button className="btn btn-primary" type="button" onClick={() => { navigate("/manage/permission/role-edit/-1") }}>
                <i className="pi pi-plus" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="row">
        <div className="col-md-12">
          <div className="role-item-container">
            <DataTable
              showGridlines
              stripedRows
              tableStyle={{ width: "100%" }}
              value={roleList}
              rows={rows}
              first={first}
              paginator={{
                totalRecords: totalElements,
                onPageChange: onPageChange
              }}
            >
              <Column field="roleName" header="角色名称"></Column>
              <Column field="status" body={statusTemplate} header="状态"></Column>
              <Column field="remark" header="备注" style={{ maxWidth: "120px" }}></Column>
              <Column field="apiEntities" body={apiListTemplate} header="后端接口权限"></Column>
              <Column field="componentEntities" body={componentListTemplate} header="前端页面权限"></Column>
              <Column field="" header="操作" body={operationTemplate}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};