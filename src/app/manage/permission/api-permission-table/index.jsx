import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { confirmDialog } from 'primereact/confirmdialog';
import apiPermissionService from "src/app/service/api-permission-service";

import './index.scss';

export default props => {
  //导航对象
  const navigate = useNavigate();

  //API 权限列表
  const [apiList, setApiList] = useState([]);

  //分页参数
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  /**
   * 分页事件
   * @param {*} event 
   */
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setPage(event.page + 1);
  };

  /**
   * 加载 API 权限列表
   */
  const loadData = () => {
    apiPermissionService.getApiPermissionTable(page, "").then(response => {
      let data = response.data;
      setTotalElements(data.totalElements);

      data = data?.content || [];
      setApiList(data);
    });
  };

  useEffect(loadData, []);

  /**
   * 删除 API 权限
   * @param {*} rowData 
   * @param {*} ri 
   */
  const delApiPermission = (rowData, ri) => {
    confirmDialog({
      message: '确定要删除吗？',
      header: '确认',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        apiPermissionService.deleteByApiId(rowData.apiPermissionId)
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
  };

  /**
   * 角色列表模板
   * @param {*} item 
   * @returns 
   */
  const roleListTemplate = (item) => {
    return (
      item?.roleEntities?.map(role => (
        <h5 key={role.roleId}>
          <span className="label label-success">{role.roleName}</span>
        </h5>
      ))
    );
  };

  /**
   * 操作按钮模板
   * @param {*} item 
   * @returns 
   */
  const operationTemplate = (item) => {
    return (
      <>
        <Button icon="pi pi-pencil" className="p-button-success" onClick={() => { navigate("/manage/api-permission-edit/" + item.apiPermissionId) }} />&nbsp;&nbsp;
        <Button icon="pi pi-trash" className="p-button-danger" onClick={() => { delApiPermission(item) }} />
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
            <button className="btn btn-primary" type="button" onClick={() => { navigate("/manage/api-permission-edit/-1") }} >
              <i className="pi pi-plus" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </form>
    <div className="row">
      <div className="col-md-12">
        <div className="permission-item-container">
          <DataTable
            showGridlines
            stripedRows
            tableStyle={{ width: "100%" }}
            value={apiList}
            rows={rows}
            first={first}
            paginator={{
              totalRecords: totalElements,
              onPageChange: onPageChange
            }}
          >
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
