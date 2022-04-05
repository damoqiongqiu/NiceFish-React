import * as React from "react";
import { useState, useEffect } from "react";
import {
  // withRouter
  useNavigate
} from "react-router-dom";
import { permissionFormValidator } from "../../validator/permission-form-validator";
function PermissionEdit(props: any) {
  let navigate = useNavigate();
  const [permission, updatePermission] = useState({
    name: ""
  });
  const [errors, setErrors] = useState({} as any);
  const [formValid, setformValid] = useState(false);
  const [meta, setMeta] = useState({
    name: { touched: false, dirty: false }
  } as any);
  function onSubmit(e: any) {
    e.preventDefault();
    console.log(permission);
  }
  function onBlur(key: any, value: any) {
    switch (key) {
      case "name":
        setMeta({ ...meta, [key]: { ...meta[key], touched: true } });
        setErrors(permissionFormValidator(permission));
        break;
    }
  }
  function cancel() {
    // props.history.goBack();
    navigate(-1)
  }
  function handleChange(key: any, value: any) {
    const uppermission = {
      ...permission,
      name: value
    };
    setMeta({ ...meta, [key]: { ...meta[key], dirty: true } });
    updatePermission(uppermission);
    setErrors(permissionFormValidator(uppermission));
  }
  useEffect(() => {
    const errors = permissionFormValidator(permission);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    setformValid(isDisabled);
  }, [errors]);

  return (
    <div className="role-edit-container font-size-16">
      <div className="card ">
        <div className="card-header">
          <h3 className="font-size-16 m-0">编辑权限</h3>
        </div>
        <div className="pd-10px ">
          <form onSubmit={onSubmit}>
            <div className="form-group row">
              <label className="col-md-2 md-text-align-right col-form-label">名称：</label>
              <div className="col-md-10">
                <input
                  name="roleName"
                  type="text"
                  value={permission.name}
                  className="form-control"
                  onBlur={e => onBlur("name", e.target.value)}
                  onChange={e => handleChange("name", e.target.value)}
                  placeholder="请输入名称"
                />
                {(meta.name.touched || meta.name.dirty) && errors.name ? (
                  <div className="text-red">{errors.name}</div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-offset-2 col-md-10">
                <button
                  className="btn btn-primary btn-margin-1rem"
                  disabled={formValid}
                >
                  保存
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ml-16px"
                  onClick={cancel}
                >
                  取消
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default PermissionEdit;
