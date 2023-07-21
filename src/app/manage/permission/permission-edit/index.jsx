import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { permissionFormValidator } from 'src/app/utils/validator/permission-form-validator';

import './index.scss';

export default props=> {
  const navigate = useNavigate();
  const [permission, updatePermission] = useState({
    name: ''
  });
  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);
  const [meta, setMeta] = useState({
    name: { touched: false, dirty: false }
  });
  function onSubmit(e) {
    e.preventDefault();
    console.log(permission);
  }
  function onBlur(key, value) {
    switch (key) {
      case 'name':
        setMeta({ ...meta, [key]: { ...meta[key], touched: true } });
        setErrors(permissionFormValidator(permission));
        break;
    }
  }
  function cancel() {
    navigate(-1);
  }
  function handleChange(key, value) {
    const upPermission = {
      ...permission,
      name: value
    };
    setMeta({ ...meta, [key]: { ...meta[key], dirty: true } });
    updatePermission(upPermission);
    setErrors(permissionFormValidator(upPermission));
  }
  useEffect(() => {
    const errors = permissionFormValidator(permission);
    const isDisabled = Object.keys(errors).some((x) => errors[x]);
    setFormValid(isDisabled);
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
                  onBlur={(e) => onBlur('name', e.target.value)}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="请输入名称"
                />
                {(meta.name.touched || meta.name.dirty) && errors.name ? (
                  <div className="text-red">{errors.name}</div>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-offset-2 col-md-10">
                <button className="btn btn-primary btn-margin-1rem" disabled={formValid}>
                  保存
                </button>
                <button type="button" className="btn btn-secondary ml-16px" onClick={cancel}>
                  取消
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
