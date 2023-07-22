import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import './index.scss';

import roleDetailMock from "src/mock-data/role-detail-mock.json"
import apiPermListMock from "src/mock-data/api-permission-list-mock.json";
import compPermListMock from "src/mock-data/component-permission-list.json";

export default props => {
  const navigate = useNavigate();
  const [roleDetail, setRoleDetail] = useState([]);
  const [apiPermList, setApiPermList] = useState([]);
  const [compPermList, setCompPermList] = useState([]);

  useEffect(() => {
    //FIXME:load data from server.
    setRoleDetail(roleDetailMock);
    //FIXME:load data from server.
    setApiPermList(apiPermListMock.content);
    //FIXME:load data from server.
    setCompPermList(compPermListMock.content);
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

  return (
    <div className="role-edit-container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">创建/编辑角色</h3>
        </div>
        <div className="panel-body">
          <form noValidate className="form-horizontal" role="form">
            <div className="form-group">
              <label className="col-md-2 control-label">角色名称：</label>
              <div className="col-md-10">
                <input
                  name="roleName"
                  type="text"
                  className="form-control"
                  placeholder="请输入角色名称"
                  required
                  minLength="2"
                  maxLength="32"
                  value={roleDetail.roleName}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">是否启用：</label>
              <div className="col-md-10">
                <div className="checkbox">
                  <label>
                    <input
                      name="roleEnabled"
                      type="checkbox"
                      checked={roleDetail.status === 1 ? true : false}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">备注：</label>
              <div className="col-md-10">
                <textarea
                  rows="5"
                  name="remark"
                  type="text"
                  className="form-control"
                  placeholder="备注"
                  maxLength="200"
                  value={roleDetail.remark}
                >
                </textarea>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* 后端接口权限配置表格 */}
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">后端接口权限</h3>
        </div>
        <div className="panel-body">
          <DataTable value={apiPermList} paginator rows={20} showGridlines stripedRows tableStyle={{ width: "100%" }}>
            <Column field="apiName" header="API 名称"></Column>
            <Column field="url" header="URL"></Column>
            <Column field="permission" header="权限通配符"></Column>
            <Column field="remark" header="备注" style={{ maxWidth: "120px" }}></Column>
            <Column field="roleEntities" body={roleListTemplate} header="已关联角色"></Column>
          </DataTable>
        </div>
      </div>
      {/* 前端页面权限配置表格 */}
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">前端页面权限</h3>
        </div>
        <div className="panel-body">
          <DataTable value={compPermList} paginator rows={20} showGridlines stripedRows tableStyle={{ width: "100%" }}>
            <Column field="componentName" header="组件名称"></Column>
            <Column field="url" header="URL"></Column>
            <Column field="displayOrder" header="现实顺序"></Column>
            <Column field="permission" header="权限通配符" style={{ maxWidth: "120px" }}></Column>
            <Column field="visiable" header="是否可见"></Column>
          </DataTable>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <button type="button" className="btn btn-success btn-margin-1rem">
            保存
          </button>
          <button type="button" className="btn btn-danger" onClick={() => { navigate(-1) }}>
            取消
          </button>
        </div>
      </div>
    </div>
  );
};
