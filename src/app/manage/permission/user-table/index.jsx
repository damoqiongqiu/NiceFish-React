import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { confirmDialog } from 'primereact/confirmdialog';
import userSercice from "src/app/service/user-service";

import './index.scss';

export default props => {
  //i18n hooks
  const { i18n } = useTranslation();

  //导航对象
  const navigate = useNavigate();

  //用户列表
  const [userList, setUserList] = useState([]);

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
   * 加载用户列表
   */
  const loadData = () => {
    userSercice.getUserTable(page, "").then(response => {
      let data = response.data;
      setTotalElements(data.totalElements);

      data = data?.content || [];
      setUserList(data);
    });
  };

  useEffect(loadData, []);

  /**
   * 删除用户
   * @param {*} rowData 
   * @param {*} ri 
   */
  const delUser = (rowData, ri) => {
    confirmDialog({
      message: i18n.t('confirmDelete'),
      header: i18n.t('confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        userSercice.del(rowData.userId)
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
   * 用户状态模板
   * @param {*} item 
   * @returns 
   */
  const statusTemplate = (item) => {
    return (
      item.status == 0
        ?
        <span className="badge bg-danger">{i18n.t("disabled")}</span>
        :
        <span className="badge bg-success">{i18n.t("enabled")}</span>
    );
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
          <span className="badge bg-success">{role.roleName}</span>
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
        <Button icon="pi pi-pencil" className="p-button-success" onClick={() => { navigate(`/manage/user-profile/${item.userId}`) }} />&nbsp;&nbsp;
        <Button icon="pi pi-trash" className="p-button-danger" onClick={() => { delUser(item) }} />
      </>
    );
  };

  return (
    <div className="user-table-container">
      <form role="form">
        <div className="input-group">
          <input name="searchStr" className="form-control" type="text" />
          <button className="btn btn-success" type="button">
            <i className="fa fa-search"></i>
          </button>
          <button className="btn btn-danger" type="button" onClick={() => { navigate(`/manage/user-profile/-1`) }}>
            <i className="fa fa-plus"></i>
          </button>
        </div>
      </form>
      <div className="row">
        <div className="col-md-12">
          <div className="user-item-container">
            <DataTable
              showGridlines
              stripedRows
              tableStyle={{ width: "100%" }}
              value={userList}
              rows={rows}
              first={first}
              paginator={{
                totalRecords: totalElements,
                onPageChange: onPageChange
              }}
            >
              <Column field="userName" header={i18n.t("user.userName")}></Column>
              <Column field="nickName" header={i18n.t("user.nickName")}></Column>
              <Column field="status" body={statusTemplate} header={i18n.t("user.status")}></Column>
              <Column field="email" header={i18n.t("user.email")}></Column>
              <Column field="cellphone" header={i18n.t("user.mobile")}></Column>
              <Column field="createTime" header={i18n.t("user.createTime")}></Column>
              <Column field="roleEntities" body={roleListTemplate} header={i18n.t("user.table.associatedRoles")}></Column>
              <Column field="" header={i18n.t("operation")} body={operationTemplate}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};
