import React, { FC, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import Captcha from 'src/app/shared/captcha';
import commentService from "src/app/service/comment-service";
import environment from "src/environments/environment";
import ajv from "src/app/service/ajv-validate-service";

import './index.scss';

// 表单输入项数据规格定义
const schema = {
  "type": "object",
  "properties": {
    "content": {
      "type": "string",
      "minLength": 1,
      "maxLength": 200,
      "errorMessage": "内容长度在 1 到 200 个字符之间。"
    },
    "captcha": {
      "type": "string",
      "minLength": 1,
      "maxLength": 4,
      "errorMessage": "验证码必须为字符串，长度在 1 到 4 个字符之间。"
    },
  },
  "required": ["content", "captcha"],
}
//ajv 的 compile 吃资源较多，这里放在组件外面，保证只执行一次。
const ajvValidate = ajv.compile(schema);

export default props => {
  //postId ，从路由参数中获取
  const { id } = useParams();

  //mock 状态
  const isMock = environment.isMock;

  //评论列表
  const [commentList, setCommentList] = useState([]);

  //分页参数
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  //表单校验状态
  const [errors, setErrors] = useState({});

  //评论 Entity
  const [commentData, setCommentData] = useState({
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
      ...commentData,
      [key]: value
    };
    setCommentData(temp);
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
      commentData.captcha = "0000";
    }

    const isValid = ajvValidate(commentData);
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

    commentService.writeComment(commentData).then(response => {
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
                value={commentData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="1-200个字符，非法字符自动截断。"
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
                      placeholder="至少1位，最多4位"
                      autoComplete="off"
                      name="captcha"
                      value={commentData.captcha}
                      onChange={(e) => handleInputChange('captcha', e.target.value)}
                    />
                    {
                      errors.captcha ? <div className="text-danger">{errors.captcha}</div> : <></>
                    }
                  </div>
                  <div className="form-group">
                    <Captcha></Captcha>
                  </div>
                </>
            }
            <button className="btn btn-primary">
              提交
            </button>
          </form>
        </div>
      </div>
      <div className="row no-gutters">
        <div className="col-md-12">
          {commentList.map((item, index) => {
            return (
              <div className="comment-item-container" key={index}>
                <p>
                  {item.nickName || item.userName} {item.time}
                </p>
                <h5>{item.content}</h5>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
