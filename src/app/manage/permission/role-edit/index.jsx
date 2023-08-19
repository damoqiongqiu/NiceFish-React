import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTable } from 'primereact/datatable';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { useNavigate, useParams } from 'react-router-dom';
import roleService from "src/app/service/role-service";
import apiPermService from "src/app/service/api-permission-service";
import compPermService from "src/app/service/component-permission-service";
import ajv from "src/app/service/ajv-validate-service";

import './index.scss';

// 表单输入项数据规格定义
const schema = {
  "type": "object",
  "properties": {
    "roleName": {
      "type": "string",
      "minLength": 2,
      "maxLength": 32,
    },
    "remark": {
      "anyOf": [
        {
          "type": "string",
          "minLength": 2,
          "maxLength": 200,
          "errorMessage": "备注长度在 8 到 16 个字符之间。"
        },
        { "type": "null" },
        { "type": "string", "minLength": 0 } // 允许空字符串
      ]
    },
  },
  "required": ["roleName"],
}
//ajv 的 compile 吃资源较多，这里放在组件外面，保证只执行一次。
const ajvValidate = ajv.compile(schema);

export default props => {
  //i18n hooks
  const { i18n } = useTranslation();

  //导航对象
  const navigate = useNavigate();

  //角色 ID
  const { roleId } = useParams();

  //所有 API 权限列表
  const [apiPermissionListAll, setApiPermissionListAll] = useState([]);

  //当前角色拥有的全部 API 权限列表
  const [apiPermissionListByRole, setApiPermissionListByRole] = useState([]);

  //API 权限表格中当前被点击的行
  const [rowClick, setRowClick] = useState(true);

  //所有前端页面权限列表
  const [compPermList, setCompPermList] = useState([]);

  //当前角色拥有的全部前端页面权限列表
  const [selectedComp, setSelectedComp] = useState([]);

  //表单校验错误信息
  const [errors, setErrors] = useState({});

  //角色自身的详情
  const [roleDetail, setRoleDetail] = useState({
    roleId,
    roleName: "",
    status: 1,
    remark: "",
  });

  /**
   * 所有 input 的 onChange 事件的处理函数，对于 checkbox/radio/select 这些组件，需要处理好 value 值再调用此函数。
   */
  const handleInputChange = (name, value) => {
    setRoleDetail({
      ...roleDetail,
      [name]: value
    });
  }

  /**
   * 获取角色自身的详情
   */
  const getRoleInfo = () => {
    roleService.getRoleInfo(roleId).then(
      response => {
        setRoleDetail(response.data);
      },
      error => console.error(error)
    );
  }

  /**
   * 获取所有 API 权限列表，TODO:带分页？？？
   */
  const getApiPermListAll = () => {
    apiPermService.getApiPermissionListAll().then(
      response => {
        let data = response.data;
        setApiPermissionListAll(data);
      },
    );
  }

  /**
   * 获取角色的全部 API 权限列表
   */
  const getApiPermListByRoleId = () => {
    apiPermService.getApiPermissionListAllByRole({ roleId }).then(
      response => {
        setApiPermissionListByRole(response.data);
      },
    );
  }

  /**
   * PrimeReact 组件需要的数据格式与服务端返回的数据格式不一致。
   * 这里 tree 递归，整理成 PrimeReact 组件需要的数据格式，此方法直接修改原始节点上的数据，不生成副本。
   * @param node 
   * @returns 
   */
  const cols = [
    { field: "componentName", header: i18n.t("componentPermission.componentName"), expander: true },
    { field: "url", header: i18n.t("componentPermission.componentUrl") },
    { field: "displayOrder", header: i18n.t("componentPermission.displayOrder") },
    { field: "permission", header: i18n.t("componentPermission.permissionWildCard") },
    {
      field: "visiable", header: i18n.t("componentPermission.table.visiable"), body: (item) => {
        return (
          item.visiable === 1 ?
            <i className="fa fa-check" aria-hidden="true" style={{ color: 'green' }}></i> :
            <i className="fa fa-times" aria-hidden="true" style={{ color: 'red' }}></i>
        );
      }
    },
  ];

  const treeDataTransformer = (node) => {
    let temp = {};
    cols.forEach((col) => {
      temp[col.field] = node[col.field];
    });
    temp.compPermId = node.compPermId;

    node.key = node.compPermId;
    node.data = temp;
    node.expanded = true;
    if (node.children) {
      node.children.forEach((child) => {
        treeDataTransformer(child);
      });
    }
    return node;
  }

  /**
   * 获取所有前端组件权限列表，TODO:带分页？？？
   */
  const getCompPermListAll = () => {
    compPermService
      .getCompPermTable(1, "")
      .then(
        (response) => {
          response.data.content.forEach((node) => {
            treeDataTransformer(node);
          });
          setCompPermList(response.data.content);
        }
      );
  }

  /**
   * 获取角色的前端组件权限列表
   */
  const getCompPermListByRoleId = () => {
    compPermService
      .getCompPermListByRoleId({ roleId })
      .then((response) => {
        if (response?.data && response?.data.length) {
          //这里的数据格式是 PrimeReact 的 TreeTable 组件需要的格式，不是服务端接口返回的格式。
          //@see https://codesandbox.io/s/90n9m3
          let temp = {};
          response.data.forEach((node) => {
            temp[node.compPermId] = { checked: true };
          });
          setSelectedComp(temp);
        }
      });
  }

  /**
   * TODO:这里看起来应该重构，按照顺序加载，第一个加载完成之后再发起第二个请求。
   */
  useEffect(() => {
    getRoleInfo();
    getApiPermListAll();
    getApiPermListByRoleId();
    getCompPermListAll();
    getCompPermListByRoleId();
  }, []);

  /**
   * 整理并提交数据
   */
  const save = (e) => {
    e.preventDefault();

    const isValid = ajvValidate(roleDetail);
    setErrors({});

    if (!isValid) {
      const fieldErrors = {};

      ajvValidate.errors.forEach((error) => {
        const field = error.instancePath.substring(1);
        const keyword = error.keyword;
        // 获取 i8n 中的错误信息，如果没有则使用默认的错误信息。i18n 字符串定义在 src\app\shared\i18n\ 中。
        const errorMessage = i18n.t(`validation.${keyword}`, error.params);
        fieldErrors[field] = errorMessage || error.message;;
      });

      setErrors(fieldErrors);
      console.log(fieldErrors);
      return;
    }

    //整理成服务端接口需要的数据格式
    delete roleDetail.apiEntities;
    delete roleDetail.componentEntities;

    let apiPermListTemp = [];
    apiPermissionListByRole.forEach((apiPerm) => {
      apiPermListTemp.push({
        apiPermissionId: apiPerm.apiPermissionId,//只传 id
      });
    });

    let compPermListTemp = [];
    for (let key in selectedComp) {
      compPermListTemp.push({
        compPermId: parseInt(key),//只传 id
      });
    }

    roleDetail.apiEntities = apiPermListTemp;
    roleDetail.componentEntities = compPermListTemp;

    //如果 roleId 为 -1，则为新增角色，否则为更新角色。
    if (roleId == "-1") {
      roleService.newRole(roleDetail).then(
        response => {
          if (response?.data?.success) {
            niceFishToast({
              severity: 'success',
              summary: i18n.t('success'),
              detail: i18n.t('success'),
            });
            window.history.back();
          } else {
            niceFishToast({
              severity: 'error',
              summary: i18n.t('error'),
              detail: i18n.t('fail'),
            });
          }
        },
        error => {
          niceFishToast({
            severity: 'error',
            summary: i18n.t('error'),
            detail: i18n.t('fail'),
          });
          console.error(error);
        }
      );
    } else {
      roleService.updateRole(roleDetail).then(
        response => {
          if (response?.data?.success) {
            niceFishToast({
              severity: 'success',
              summary: i18n.t('success'),
              detail: i18n.t('success'),
            });
            window.history.back();
          } else {
            niceFishToast({
              severity: 'error',
              summary: i18n.t('error'),
              detail: i18n.t('fail'),
            });
          }
        },
        error => {
          niceFishToast({
            severity: 'error',
            summary: i18n.t('error'),
            detail: i18n.t('fail'),
          });
          console.error(error);
        }
      );
    }
  }

  return (
    <div className="role-edit-container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{i18n.t("role.edit.title")}</h3>
        </div>
        <div className="panel-body">
          <form noValidate className="form-horizontal" role="form">
            <div className="form-group">
              <label className="col-md-2 control-label">{i18n.t("role.roleName")}：</label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder={i18n.t("role.edit.plsEnterRoleName")}
                  name="roleName"
                  value={roleDetail.roleName}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">{i18n.t("role.enabled")}：</label>
              <div className="col-md-10">
                <div className="checkbox">
                  <label>
                    <input
                      name="status"
                      type="checkbox"
                      checked={(roleDetail.status === 1) ? true : false}
                      onChange={(e) => {
                        let status = e.target.checked ? 1 : 0;
                        handleInputChange(e.target.name, status);
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">{i18n.t("role.remark")}：</label>
              <div className="col-md-10">
                <textarea
                  rows="5"
                  type="text"
                  className="form-control"
                  placeholder={i18n.t("role.edit.plsEnterRemark")}
                  name="remark"
                  value={roleDetail.remark}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
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
          <h3 className="panel-title">{i18n.t("role.apiPermission")}</h3>
        </div>
        <div className="panel-body">
          <DataTable
            value={apiPermissionListAll}
            showGridlines
            stripedRows
            tableStyle={{ width: "100%" }}
            selectionMode={rowClick ? null : 'checkbox'}
            selection={apiPermissionListByRole}
            onSelectionChange={(e) => {
              setApiPermissionListByRole(e.value);
            }}
          >
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            <Column field="apiName" header={i18n.t("apiPermission.apiName")}></Column>
            <Column field="url" header={i18n.t("apiPermission.apiUrl")}></Column>
            <Column field="permission" header={i18n.t("apiPermission.permissionWildCard")}></Column>
            <Column field="remark" header={i18n.t("apiPermission.remark")} style={{ maxWidth: "120px" }}></Column>
            <Column field="roleEntities" body={
              (item) => {
                return (
                  item?.roleEntities?.map(role => (
                    <h5 key={role.roleId}>
                      <span className="label label-success">{role.roleName}</span>
                    </h5>
                  ))
                );
              }
            } header={i18n.t("apiPermission.table.associatedRoles")}></Column>
          </DataTable>
        </div>
      </div>

      {/* 前端权限配置表格 */}
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{i18n.t("role.componentPermission")}</h3>
        </div>
        <div className="panel-body">
          {/* TODO:默认展开所有节点 */}
          <TreeTable
            tableStyle={{ minWidth: '100' }}
            value={compPermList}
            selectionMode="checkbox"
            selectionKeys={selectedComp}
            onSelectionChange={
              (e) => {
                setSelectedComp(e.value);
              }
            }
          >
            {
              cols.map((col, index) => {
                return (
                  <Column
                    key={index}
                    field={col.field}
                    header={col.header}
                    expander={col.expander}
                  >
                  </Column>
                )
              })
            }
          </TreeTable>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <button type="button" className="btn btn-primary mr-1rem" onClick={save}>
            {i18n.t("save")}
          </button>
          <button type="button" className="btn btn-default" onClick={() => { navigate(-1) }}>
            {i18n.t("cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};
