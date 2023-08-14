import React, { FC, useState, useEffect } from 'react';
import ajv from "src/app/service/ajv-validate-service";
import { useTranslation } from 'react-i18next';

import './index.scss';

// 表单输入项数据规格定义
const schema = {
  "type": "object",
  "properties": {
    "email": {
      "type": "string",
      "format": 'email',
    },
  },
  "required": ["email"],
}
//ajv 的 compile 吃资源较多，这里放在组件外面，保证只执行一次。
const ajvValidate = ajv.compile(schema);

export default props => {
  //i18n hooks
  const { i18n } = useTranslation();

  //表单错误信息
  const [errors, setErrors] = useState({});

  //表单数据
  const [formValue, setFormValue] = useState({
    email: ''
  });

  /**
   * 表单值改变事件
   * @param {*} key 
   * @param {*} value 
   */
  function handleChange(key, value) {
    setFormValue({
      ...formValue,
      [key]: value
    });
  }

  /**
   * 发送请求
   * @param {*} e 
   * @returns 
   */
  function retrievePwd(e) {
    e.preventDefault();

    const isValid = ajvValidate(formValue);
    setErrors({});

    if (!isValid) {
      const fieldErrors = {};

      ajvValidate.errors.forEach((error) => {
        const field = error.instancePath.substring(1);
        const keyword = error.keyword;
        // 获取 i8n 中的错误信息，如果没有则使用默认的错误信息。i18n 字符串定义在 src\app\shared\i18n\ 中。
        // FIXME: i18n 的 KV 映射需要重新设计，保证复用和一致。
        const errorMessage = i18n.t(`validation.${keyword}`, error.params);
        fieldErrors[field] = errorMessage || error.message;;
      });

      setErrors(fieldErrors);
      console.log(fieldErrors);
      return;
    }

    console.log(formValue);
  }

  return (
    <div className="container forget-pwd-container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{i18n.t("retrivePassword")}</h3>
        </div>
        <div className="panel-body">
          <form className="form-horizontal" role="form">
            <div className={`form-group ${errors.email ? "has-error" : ""}`}>
              <label className="col-md-2 control-label">{i18n.t("email")}</label>
              <div className="col-md-10">
                <input
                  className={`form-control`}
                  type="text"
                  autoComplete="off"
                  value={formValue.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
                {
                  errors.email ? <div className="text-danger">{errors.email}</div> : <></>
                }
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-offset-2 col-md-10">
                <button type="button" className="btn btn-primary" onClick={retrievePwd}>{i18n.t("sendEmail")}</button>
              </div>
            </div>
          </form>
          <div className="alert">{ }</div>
        </div>
      </div>
    </div>
  );
};