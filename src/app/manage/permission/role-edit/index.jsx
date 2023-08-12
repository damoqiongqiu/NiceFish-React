import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { useNavigate, useParams } from 'react-router-dom';
import roleService from "src/app/service/role-service";
import apiPermService from "src/app/service/api-permission-service";
import compPermService from "src/app/service/component-permission-service";

import './index.scss';

export default props => {
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

  //角色自身的详情
  const [roleDetail, setRoleDetail] = useState({
    roleId,
    roleName: "",
    status: 1,
    remark: "",
  });

  //角色详情表单是否合法
  const [isFormValid, setFormValid] = useState(true);

  /**
   * 输入项的校验状态
   */
  const [validationResult, setValidationResult] = useState({
    roleName: {
      valid: true,
      ruleName: "",//valid 为 true 时，此项为空
      message: '',
    },
    remark: {
      valid: true,
      ruleName: "",
      message: '',
    }
  });

  /**
   * 输入项的校验规则
   */
  const validators = {
    roleName: [
      {
        ruleName: 'required',
        message: '请输入角色名称',
        fn: (value) => {
          return (value + "").trim().length > 0;
        }
      },
      {
        ruleName: 'maxLength',
        message: '角色名称最多 32 位',
        fn: (value) => {
          return (value + "").trim().length <= 32;
        }
      },
      {
        ruleName: 'minLength',
        message: '角色名称最少 2 位',
        fn: (value) => {
          return (value + "").trim().length >= 2;
        }
      }
    ],
    remark: [
      {
        ruleName: 'maxLength',
        message: '备注最多 200 个字符',
        fn: (value) => {
          return (value + "").trim().length <= 200;
        }
      },
      {
        ruleName: 'minLength',
        message: '备注最少 2 个字符',
        fn: (value) => {
          return (value + "").trim().length >= 2;
        }
      }
    ],
  }

  /**
   * 校验单个输入项的合法性
   */
  const validateField = (name, value) => {
    if (!validators[name]) {
      return;
    }

    let temp = {
      ...validationResult,
      ...{
        [name]: {
          valid: true,
          ruleName: "",
          message: '',
        }
      }
    };

    //非必填且值为空时，结果标记为合法，不再继续校验。
    if (value.length === 0) {
      let isRequired = false;
      validators[name].forEach(validator => {
        if (validator.ruleName === 'required') {
          isRequired = true;
        }
      });
      if (!isRequired) {
        return;
      }
    }

    validators[name].forEach(validator => {
      if (!validator.fn(value)) {
        temp[name].valid = false;
        temp[name].ruleName = validator.ruleName;
        temp[name].message = validator.message;
      }
    });

    setValidationResult(temp);
  }

  /**
   * 所有 input 的 onChange 事件的处理函数，对于 checkbox/radio/select 这些组件，需要处理好 value 值再调用此函数。
   */
  const handleInputChange = (name, value) => {
    validateField(name, value);
    setRoleDetail({
      ...roleDetail,
      [name]: value
    });
  }

  /**
   * 校验表单整体的合法性，只要有一个输入项不合法，表单整体标记为不合法。
   * @returns 
   */
  const validateFormAll = () => {
    let flag = true;

    for (let key in roleDetail) {
      if (document.getElementsByName(key).length) {
        let value = document.getElementsByName(key)[0].value;
        validateField(key, value);
      }
    }

    for (let key in validationResult) {
      if (!validationResult[key].valid) {
        flag = false;
      }
    }

    setFormValid(flag);
  }

  /**
   * 获取角色自身的详情
   */
  const getRoleInfo = () => {
    roleService.getRoleInfo(roleId).then(
      response => {
        let data = response.data;
        setRoleDetail(data);
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
    { field: "componentName", header: "组件名称", expander: true },
    { field: "url", header: "URL" },
    { field: "displayOrder", header: "显示顺序" },
    { field: "permission", header: "权限通配符" },
    { field: "visiable", header: "是否可见" },
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

    validateFormAll();//FIXME:校验逻辑看起来没有生效。
    if (!isFormValid) {
      niceFishToast({
        severity: 'error',
        summary: 'Error',
        detail: '存在不合法的输入项，请检查',
      });
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
              summary: '成功',
              detail: '新增角色成功'
            });
            window.history.back();
          } else {
            niceFishToast({
              severity: 'error',
              summary: '失败',
              detail: '新增角色失败'
            });
          }
        },
        error => {
          niceFishToast({
            severity: 'error',
            summary: '失败',
            detail: '新增角色失败'
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
              summary: '成功',
              detail: '更新角色成功'
            });
            window.history.back();
          } else {
            niceFishToast({
              severity: 'error',
              summary: '失败',
              detail: '更新角色失败'
            });
          }
        },
        error => {
          niceFishToast({
            severity: 'error',
            summary: '失败',
            detail: '更新角色失败'
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
          <h3 className="panel-title">创建/编辑角色</h3>
        </div>
        <div className="panel-body">
          <form noValidate className="form-horizontal" role="form">
            <div className="form-group">
              <label className="col-md-2 control-label">角色名称：</label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="请输入角色名称"
                  name="roleName"
                  value={roleDetail.roleName}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  onBlur={(e) => validateField(e.target.name, e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">是否启用：</label>
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
              <label className="col-md-2 control-label">备注：</label>
              <div className="col-md-10">
                <textarea
                  rows="5"
                  type="text"
                  className="form-control"
                  placeholder="备注"
                  name="remark"
                  value={roleDetail.remark}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  onBlur={(e) => validateField(e.target.name, e.target.value)}
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
            <Column field="apiName" header="API 名称"></Column>
            <Column field="url" header="URL"></Column>
            <Column field="permission" header="权限通配符"></Column>
            <Column field="remark" header="备注" style={{ maxWidth: "120px" }}></Column>
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
            } header="已关联角色"></Column>
          </DataTable>
        </div>
      </div>
      {/* 前端权限配置表格 */}
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">前端页面权限</h3>
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
          <button type="button" className="btn btn-success btn-margin-1rem" onClick={save}>
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
