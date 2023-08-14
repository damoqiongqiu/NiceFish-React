import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { confirmDialog } from 'primereact/confirmdialog';
import userSercice from "src/app/service/user-service";

import './index.scss';

export default props => {
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
      message: '确定要删除吗？',
      header: '确认',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        userSercice.del(rowData.userId)
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

  /**
   * 用户状态模板
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
        <Button icon="pi pi-pencil" className="p-button-success" onClick={() => { navigate(`/manage/user-profile/${item.userId}`) }} />&nbsp;&nbsp;
        <Button icon="pi pi-trash" className="p-button-danger" onClick={() => { delUser(item) }} />
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
              <button className="btn btn-primary" type="button" onClick={() => { navigate(`/manage/user-profile/-1`) }}>
                <i className="pi pi-plus" aria-hidden="true"></i>
              </button>
            </div>
          </div>
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
