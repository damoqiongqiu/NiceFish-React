import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import Captcha from 'src/app/shared/captcha';
import commentService from "src/app/service/comment-service";
import environment from "src/environments/environment";
import formatTimeAgo from 'src/app/shared/date-formater';
import ajv from "src/app/service/ajv-validate-service";
import { useTranslation } from 'react-i18next';

import './index.scss';

// 表单输入项数据规格定义
const schema = {
  "type": "object",
  "properties": {
    "content": {
      "type": "string",
      "minLength": 1,
      "maxLength": 200,
    },
    "captcha": {
      "type": "string",
      "minLength": 1,
      "maxLength": 4,
    },
  },
  "required": ["content", "captcha"],
}
//ajv 的 compile 吃资源较多，这里放在组件外面，保证只执行一次。
const ajvValidate = ajv.compile(schema);

export default props => {
  //i18n hooks
  const { i18n } = useTranslation();

  //postId ，从路由参数中获取
  const { id } = useParams();

  //mock 状态
  const isMock = environment.isMock;

  //验证码组件引用
  const captchaRef = useRef();

  //评论列表
  const [commentList, setCommentList] = useState([]);

  //分页参数
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  //表单校验状态
  const [errors, setErrors] = useState({});

  //表单数据
  const [formData, setFormData] = useState({
    postId: id,
    content: "",
    captcha: ""
  });

  /**
   * 加载评论列表
   */
  const loadCommentList = () => {
    commentService.getCommentList(id, page).then(response => {
      let data = response.data;
      setTotalElements(data.totalElements);

      data = data?.content || [];
      setCommentList(data);
      console.log(data);
    });
  };

  useEffect(loadCommentList, []);

  /**
   * 处理表单输入项变更事件
   * @param {*} key 
   * @param {*} value 
   */
  const handleInputChange = (key, value) => {
    const temp = {
      ...formData,
      [key]: value
    };
    setFormData(temp);
  }

  /**
   * 提交评论数据
   * @param {*} e 
   * @returns 
   */
  const onSubmit = (e) => {
    e.preventDefault();

    //mock 状态无法从服务端加载验证码，这里提供一个假的默认值
    if (isMock) {
      formData.captcha = "0000";
    }

    const isValid = ajvValidate(formData);
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

    commentService.writeComment(formData).then(response => {
      // 触发验证码刷新
      captchaRef.current.refresh();

      // 清空表单数据
      setFormData({
        postId: id,
        content: "",
        captcha: ""
      });

      // 重新加载评论列表
      loadCommentList();
    });
  }

  return (
    <div className="add-component-container mt-16px">
      <div className="row no-gutters">
        <div className="col-md-12">
          <form onSubmit={onSubmit}>
            <div className={`form-group ${errors.content ? "has-error" : ""}`}>
              <textarea
                rows="5"
                className="form-control"
                name="content"
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder={i18n.t("pleaseInputSomeContent")}
              />
              {
                errors.content ? <div className="text-danger">{errors.content}</div> : <></>
              }
            </div>
            {
              // mock 状态不需要验证码
              isMock ? <></> :
                <>
                  <div className={`form-group ${errors.captcha ? "has-error" : ""}`}>
                    <input
                      className={`form-control`}
                      type="text"
                      placeholder={i18n.t("pleaseInputCaptcha")}
                      autoComplete="off"
                      name="captcha"
                      value={formData.captcha}
                      onChange={(e) => handleInputChange('captcha', e.target.value)}
                    />
                    {
                      errors.captcha ? <div className="text-danger">{errors.captcha}</div> : <></>
                    }
                  </div>
                  <div className="form-group">
                    <Captcha ref={captchaRef} ></Captcha>
                  </div>
                </>
            }
            <button className="btn btn-primary">
              {i18n.t("submit")}
            </button>
          </form>
        </div>
      </div>
      <div className="row no-gutters">
        <div className="col-md-12">
          {commentList.map((item, index) => {
            return (
              <div className="comment-item-container" key={index}>
                <div className='comment-header'>
                  <h4>
                    @{item.nickName || item.userName}
                  </h4>
                  <span>{formatTimeAgo(item.time)}</span>
                </div>
                <p>{item.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
