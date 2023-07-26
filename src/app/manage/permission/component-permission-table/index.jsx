import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import * as _ from 'lodash';
import { confirmDialog } from 'primereact/confirmdialog';
import compPermService from "src/app/service/component-permission-service";

import './index.scss';

export default props => {
  const navigate = useNavigate();
  // tree 形的数据，服务端接口已经整理好
  const [compPermList, setCompPermList] = useState([]);
  //TODO: tree 目前没有带分页，这些分页参数目前没有作用，后续需要修改。
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const cols = [
    { field: "componentName", header: "组件名称", expander: true },
    { field: "url", header: "URL" },
    { field: "displayOrder", header: "显示顺序" },
    { field: "permission", header: "权限通配符" },
    { field: "visiable", header: "是否可见" },
  ];

  /**
   * PrimeReact 组件需要的数据格式与服务端返回的数据格式不一致。
   * 这里 tree 递归，整理成 PrimeReact 组件需要的数据格式
   * @param node 
   * @returns 
   */
  const treeDataTransformer = (node) => {
    let data = {};
    cols.forEach((col) => {
      data[col.field] = node[col.field];
    });
    // 为了方便接口调用，将 compPermId 和父层的 compPermId 保存在 data 中
    data.compPermId = node.compPermId;
    let pId = -1;
    if (_.isNumber(node.parentEntity)) {
      pId = node.parentEntity;
    } else if (_.isObject(node.parentEntity)) {
      pId = node.parentEntity.compPermId;
    }
    data.parentEntity = { compPermId: pId };
    node.data = data;
    node.expanded = true;
    if (node.children) {
      node.children.forEach((child) => {
        treeDataTransformer(child);
      });
    }
    return node;
  }

  const getCompPermListByPage = () => {
    return compPermService
      .getCompPermTable(page, "")
      .then((response) => {
        let data = response.data;
        data.content.forEach((node) => {
          treeDataTransformer(node);
        });
        setCompPermList(data.content);
        setTotalElements(data.totalElements);
      });
  }

  const delComponentPermission = (rowData) => {
    confirmDialog({
      message: '确定要删除吗？',
      header: '确认',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let compPermId = rowData.compPermId;
        compPermService
          .deleteByCompPermId(compPermId)
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
          .finally(getCompPermListByPage);
      },
    });
  }


  useEffect(() => {
    getCompPermListByPage();
  }, []);

  const operationTemplate = (item) => {
    return (
      <>
        <Button icon="pi pi-pencil" className="p-button-success" onClick={() => {
          let pId = item.parentEntity ? item.parentEntity.compPermId : "-1";
          navigate("/manage/permission/component-permission-edit/" + item.compPermId + "/" + pId)
        }} />&nbsp;&nbsp;
        <Button icon="pi pi-plus" className="p-button-warning" onClick={() => {
          navigate("/manage/permission/component-permission-edit/-1/ " + item.compPermId)
        }}></Button>&nbsp;&nbsp;
        <Button icon="pi pi-trash" className="p-button-danger" onClick={() => { delComponentPermission(item); }} />
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
              <button className="btn btn-primary" type="button" onClick={() => { navigate("/manage/permission/component-permission-edit/-1/-1") }}>
                <i className="pi pi-plus" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="row">
        <div className="col-md-12">
          <div className="permission-item-container">
            {/* TODO:默认展开所有节点 */}
            <TreeTable
              value={compPermList}
              tableStyle={{ minWidth: '100' }}>
              {
                cols.map((col) => {
                  return <Column
                    key={col.field}
                    field={col.field}
                    header={col.header}
                    expander={col.expander}
                  >
                  </Column>
                })
              }
              <Column field="" header="操作" body={operationTemplate}></Column>
            </TreeTable>
          </div>
        </div>
      </div>
    </div>
  );
};
