import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { roleFormValidator } from 'src/app/utils/validator/role-form-validator';
import './index.scss';
import postList from "src/mock-data/post-list-mock.json";

export default props => {
  const navigate = useNavigate();
  const [role, updateRole] = useState({
    name: '',
    permission: []
  });
  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [meta, setMeta] = useState({
    name: { touched: false, dirty: false },
    pwd: { touched: false, dirty: false }
  });
  const [mockData, updateMockData] = useState([]);
  const [targetKeys, updateTargetKeys] = useState([]);
  function getMock() {
    let mockData = [];
    let targetKeys = [];
    mockData = [
      {
        key: '1',
        title: '发表文章',
        chosen: true
      },
      {
        key: '2',
        title: '删除文章',
        chosen: false
      },
      {
        key: '3',
        title: '创建用户',
        chosen: true
      },
      {
        key: '4',
        title: '删除用户',
        chosen: false
      }
    ];
    mockData.map((value) => {
      if (value.chosen) {
        targetKeys.push(value.key);
      }
    });
    updateRole({ ...role, permission: targetKeys });
    updateTargetKeys([...targetKeys]);
    updateMockData([...mockData]);
  }
  function handleChange(targetKeys, value) {
    if (Array.isArray(targetKeys)) {
      updateTargetKeys(targetKeys);
      const uprole = {
        ...role,
        permission: targetKeys
      };
      updateRole(uprole);
    } else {
      const uprole = {
        ...role,
        name: value
      };
      setMeta({ ...meta, [targetKeys]: { ...meta[targetKeys], dirty: true } });
      updateRole(uprole);
      setErrors(roleFormValidator(uprole));
    }
  }
  function onSubmit(e) {
    console.log(role);
    e.preventDefault();
  }
  function onBlur(key, value) {
    switch (key) {
      case 'name':
        setMeta({ ...meta, [key]: { ...meta[key], touched: true } });
        setErrors(roleFormValidator(role));
        break;
    }
  }
  function cancel() {
    navigate(-1);
  }
  useEffect(() => {
    const errors = roleFormValidator(role);
    const isDisabled = Object.keys(errors).some((x) => errors[x]);
    setFormValid(isDisabled);
  }, [errors]);
  useEffect(() => {
    getMock();
  }, []);
  return (
    <div className="role-edit-container font-size-16">
      <div className="card ">
        <div className="card-header">
          <h3 className="font-size-16 m-0">编辑角色</h3>
        </div>
        <div className="pd-10px ">
          <form onSubmit={onSubmit}>
            <div className="form-group row">
              <label className="col-md-2 md-text-align-right col-form-label">名称：</label>
              <div className="col-md-10">
                <input
                  name="roleName"
                  type="text"
                  value={role.name}
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
            <div className="form-group row">
              <label className="col-md-2 md-text-align-right col-form-label">权限：</label>
              <div className="col-md-10">
                {/* <Transfer
                  dataSource={mockData}
                  targetKeys={targetKeys}
                  onChange={handleChange}
                  render={(item) => item.title}
                /> */}
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
