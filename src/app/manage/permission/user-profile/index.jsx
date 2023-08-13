import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userService from 'src/app/service/user-service';
import defaultAvatar from 'src/assets/images/react.svg';
import ajv from "src/app/service/ajv-validate-service";

import './index.scss';

// 表单输入项数据规格定义
const schema = {
  "type": "object",
  "properties": {
    "userName": {
      "type": "string",
      "format": 'email',
      "errorMessage": "请输入正确的邮箱格式。"
    },
    "nickName": {
      "anyOf": [
        {
          "type": "string",
          "minLength": 2,
          "maxLength": 32,
          "errorMessage": "昵称长度在 2 到 32 个字符之间"
        },
        { "type": "null" },
        { "type": "string", "minLength": 0 } // 允许空字符串
      ]
    },
    "email": {
      "anyOf": [
        {
          "type": "string",
          "format": 'email',
          "errorMessage": "请输入正确的邮箱格式。"
        },
        { "type": "null" },
        { "type": "string", "minLength": 0 } // 允许空字符串
      ]
    },
    "cellphone": {
      "anyOf": [
        {
          "type": "string",
          "format": "cellphone",
          "errorMessage": "请输入正确的手机号码。"
        },
        { "type": "null" },
        { "type": "string", "minLength": 0 } // 允许空字符串
      ]
    },
    "password": {
      "type": "string",
      "minLength": 8,
      "maxLength": 16,
      "errorMessage": "密码长度在 8 到 16 个字符之间。"
    },
    "confirmPassword": {
      "const": {
        "$data": "1/password"
      },
      "type": "string",
      "minLength": 8,
      "maxLength": 16,
      "errorMessage": "两次密码必须相同。"
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
  "required": ["userName", "password", "confirmPassword"],
}
//ajv 的 compile 吃资源较多，这里放在组件外面，保证只执行一次。
const ajvValidate = ajv.compile(schema);

/**
 * 性别选项，静态数据。
 * value 必须是数值，与服务端的接口类型对应，否则无法选中。
 */
const genderList = [
  { label: '女', value: 0 },
  { label: '男', value: 1 },
  { label: '未知', value: 2 }
];

/**
 * UserProfile 用户详情组件，创建和编辑用户都用这个组件。
 * @author 大漠穷秋
 */
export default props => {
  // 导航对象
  const navigate = useNavigate();

  // userId ，从路由参数中获取
  const { userId } = useParams();

  //表单校验错误信息
  const [errors, setErrors] = useState({});

  // formValue 里面的 k-v 与服务端接口对应，方便提交和加载数据。
  const [formValue, setFormValue] = useState({
    userId,
    avatarURL: "",
    userName: "",
    nickName: "",
    gender: 0,
    email: "",
    cellphone: "",
    password: "",
    confirmPassword: "",
    status: "",
    remark: "",
  });

  /**
   * 所有 input 的 onChange 事件的处理函数，对于 checkbox/radio/select 这些组件，需要处理好 value 值再调用此函数。
   */
  const handleInputChange = (name, value) => {
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  /**
   * 保存数据到服务端
   * @returns 
   */
  const save = (e) => {
    e.preventDefault();

    const isValid = ajvValidate(formValue);
    setErrors({});

    if (!isValid) {
      const fieldErrors = {};
      ajvValidate?.errors.forEach((error) => {
        const field = error.instancePath.substring(1);
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      console.log(fieldErrors);
      return;
    }

    if (userId !== "-1") {
      delete formValue.confirmPassword;
      delete formValue.salt;
      userService.updateUser(formValue).then(
        response => {
          let data = response.data;
          if (data.success) {
            niceFishToast({
              severity: 'success',
              summary: 'Success',
              detail: '更新成功',
            });
            window.history.back();
          } else {
            niceFishToast({
              severity: 'error',
              summary: 'Error',
              detail: '更新失败',
            });
          }
        },
        error => {
          niceFishToast({
            severity: 'error',
            summary: 'Error',
            detail: '更新失败',
          });
        }
      );
    } else {
      userService.newUser(formValue).then(
        response => {
          let data = response.data;
          if (data.success) {
            niceFishToast({
              severity: 'success',
              summary: 'Success',
              detail: '创建成功',
            });
            window.history.back();
          } else {
            niceFishToast({
              severity: 'error',
              summary: 'Error',
              detail: data?.msg || '创建失败',
            });
          }
        },
        error => {
          niceFishToast({
            severity: 'error',
            summary: 'Error',
            detail: '创建失败',
          });
        }
      );
    }
  }

  /**
   * 如果是编辑用户，加载用户信息。
   */
  useEffect(() => {
    if (userId !== "-1") {
      userService.getUserDetails(userId).then(
        response => {
          let data = response.data.data;
          setFormValue({
            ...data,
            password: "",
            confirmPassword: "",
          });
        },
        error => {
          niceFishToast({
            severity: 'error',
            summary: 'Error',
            detail: '加载用户信息失败',
          });
        }
      );
    }
  }, []);

  return (
    <div className="user-profile-container">
      <div className="panel panel-default">
        <div className="panel-heading">创建/编辑用户</div>
        <div className="panel-body">
          <form className="form-horizontal" role="form">
            <div className="form-group">
              <label className="col-md-2 control-label">当前头像：</label>
              <div className="col-md-10">
                <img
                  src={formValue.avatarURL || defaultAvatar}
                  style={{ width: "64px" }}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">上传头像：</label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="file"
                  placeholder="上传头像"
                />
              </div>
            </div>
            <div className={`form-group  ${errors.userName ? "has-error" : ""}`}>
              <label className="col-md-2 control-label">用户名：</label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="input"
                  placeholder="用户名"
                  name="userName"
                  value={formValue.userName}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                />
                {
                  errors.userName ? <div className="text-danger">{errors.userName}</div> : <></>
                }
              </div>
            </div>
            <div className={`form-group  ${errors.nickName ? "has-error" : ""}`} >
              <label className="col-md-2 control-label">昵称：</label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="input"
                  placeholder="昵称"
                  name="nickName"
                  value={formValue.nickName}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                />
                {
                  errors.nickName ? <div className="text-danger">{errors.nickName}</div> : <></>
                }
              </div>
            </div>
            <div className={`form-group`} >
              <label className="col-md-2 control-label">性别：</label>
              <div className="col-md-10">
                {
                  genderList.map((item, index) => {
                    return <label className="radio-inline" key={index}>
                      <input
                        type="radio"
                        name="gender"
                        value={item.value}
                        checked={(item.value == formValue.gender) ? true : false}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                      /> {item.label}
                    </label>
                  })
                }
              </div>
            </div>
            <div className={`form-group  ${errors.email ? "has-error" : ""}`} >
              <label className="col-md-2 control-label">常用邮箱：</label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="input"
                  placeholder="常用邮箱"
                  name="email"
                  value={formValue.email}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                />
                {
                  errors.email ? <div className="text-danger">{errors.email}</div> : <></>
                }
              </div>
            </div>
            <div className={`form-group  ${errors.cellphone ? "has-error" : ""}`}>
              <label className="col-md-2 control-label">手机号：</label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="input"
                  placeholder="手机号"
                  name="cellphone"
                  value={formValue.cellphone}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                />
                {
                  errors.cellphone ? <div className="text-danger">{errors.cellphone}</div> : <></>
                }
              </div>
            </div>
            <div className={`form-group ${errors.password ? "has-error" : ""}`}>
              <label className="col-md-2 control-label">密码：</label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="password"
                  value={formValue.password}
                  autoComplete="off"
                  onChange={(e) => handleInputChange('password', e.target.value)}
                />
                {
                  errors.password ? <div className="text-danger">{errors.password}</div> : <></>
                }
              </div>
            </div>
            <div className={`form-group  ${errors.confirmPassword ? "has-error" : ""}`}>
              <label className="col-md-2 control-label">重复密码：</label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="password"
                  value={formValue.confirmPassword}
                  autoComplete="off"
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                />
                {
                  errors.confirmPassword ? <div className="text-danger">{errors.confirmPassword}</div> : <></>
                }
              </div>
            </div>
            <div className={`form-group`}>
              <label className="col-md-2 control-label">启用：</label>
              <div className="col-md-10">
                <div className="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="status"
                      checked={(formValue.status === 1) ? true : false}
                      onChange={(e) => {
                        let status = e.target.checked ? 1 : 0;
                        handleInputChange(e.target.name, status);
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className={`form-group  ${errors.remark ? "has-error" : ""}`}>
              <label className="col-md-2 control-label">简介：</label>
              <div className="col-md-10">
                <textarea
                  rows="5"
                  className="form-control"
                  placeholder="简介"
                  name="remark"
                  value={formValue.remark}
                  onChange={(e) => {
                    handleInputChange(e.target.name, e.target.value);
                  }}
                ></textarea>
                {
                  errors.remark ? <div className="text-danger">{errors.remark}</div> : <></>
                }
              </div>
            </div>
          </form>
        </div>
      </div >
      <form className="form-horizontal" role="form">
        <div className="form-group">
          <div className="col-md-12">
            <button type="button" className="btn btn-primary btn-margin-1rem" onClick={save}>
              保存
            </button>
            <button type="button" className="btn btn-default" onClick={() => { navigate(-1) }}>
              取消
            </button>
          </div>
        </div>
      </form>
    </div >
  );
};