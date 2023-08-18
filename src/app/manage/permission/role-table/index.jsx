import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { confirmDialog } from 'primereact/confirmdialog';
import roleSercice from "src/app/service/role-service";

import './index.scss';

export default props => {
  //i18n hooks
  const { i18n } = useTranslation();

  //导航对象
  const navigate = useNavigate();

  //角色列表
  const [roleList, setRoleList] = useState([]);

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
   * 加载角色列表
   */
  const loadData = () => {
    roleSercice.getRoleTable(page, "").then(response => {
      let data = response.data;
      setTotalElements(data.totalElements);

      data = data?.content || [];
      setRoleList(data);
    });
  };

  useEffect(loadData, []);

  /**
   * 删除角色
   * @param {*} rowData 
   * @param {*} ri 
   */
  const delRole = (rowData, ri) => {
    confirmDialog({
      message: i18n.t('confirmDelete'),
      header: i18n.t('confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        roleSercice.deleteRole(rowData.roleId)
          .then(
            response => {
              niceFishToast({
                severity: 'success',
                summary: i18n.t('success'),
                detail: i18n.t('success'),
              });
            },
            error => {
              niceFishToast({
                severity: 'error',
                summary: i18n.t('error'),
                detail: i18n.t('fail'),
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

  /**
   * 角色状态模板
   * @param {*} item 
   * @returns 
   */
  const statusTemplate = (item) => {
    return (
      item.status == 0 ?
        <span className="label label-danger">禁用</span> :
        <span className="label label-success">正常</span>
    );
  };

  /**
   * API 权限列表模板
   * @param {*} item 
   * @returns 
   */
  const apiListTemplate = (item) => {
    return (
      item?.apiEntities?.map(api => (
        <h5 key={api.apiPermissionId}>
          <span className="label label-success">{api.apiName}</span>
        </h5>
      ))
    );
  };

  /**
   * 组件权限列表模板
   * @param {*} item 
   * @returns 
   */
  const componentListTemplate = (item) => {
    return (
      item?.componentEntities?.map(comp => (
        <h5 key={comp.compPermId}>
          <span className="label label-success">{comp.componentName}</span>
        </h5>
      ))
    );
  };

  return (
    <div className="role-table-container">
      <form className="form-vertical" role="form">
        <div className="row">
          <div className="col-md-11">
            <div className="input-group">
              <input name="searchStr" className="form-control" type="text" />
              <span className="input-group-btn">
                <button className="btn btn-default" type="button" >
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </span>
            </div>
          </div>
          <div className="col-md-1">
            <div className="input-group pull-right">
              <button className="btn btn-primary" type="button" onClick={() => { navigate("/manage/role-edit/-1") }}>
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
              <Column field="roleName" header={i18n.t("role.roleName")}></Column>
              <Column field="status" body={statusTemplate} header={i18n.t("status")}></Column>
              <Column field="remark" style={{ maxWidth: "120px" }} header={i18n.t("role.remark")}></Column>
              <Column field="apiEntities" body={apiListTemplate} header={i18n.t("role.apiPermission")}></Column>
              <Column field="componentEntities" body={componentListTemplate} header={i18n.t("role.componentPermission")}></Column>
              <Column field="" header={i18n.t("operation")} body={
                (item) => {
                  return (
                    <>
                      <Button icon="pi pi-pencil" className="p-button-success" onClick={() => { navigate("/manage/role-edit/" + item.roleId) }} />&nbsp;&nbsp;
                      <Button icon="pi pi-trash" className="p-button-danger" onClick={() => { delRole(item) }} />
                    </>
                  );
                }
              }></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};