import React, { FC, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import Captcha from 'src/app/shared/captcha';
import commentService from "src/app/service/comment-service";
import environment from "src/environments/environment";

import './index.scss';

export default props => {
  const { id } = useParams();//postId
  const isMock = environment.isMock;
  const [commentList, setCommentList] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [isFormValid, setFormValid] = useState(true);
  const [commentData, setCommentData] = useState({
    postId: id,
    content: "",
    captcha: ""
  });

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
   * 输入项的校验状态
   */
  const [validationResult, setValidationResult] = useState({
    content: {
      valid: true,
      ruleName: "",
      message: '',
    },
    captcha: {
      valid: true,
      ruleName: "",
      message: '',
    },
  });

  /**
   * 输入项的校验规则
   */
  const validators = {
    content: [
      {
        ruleName: 'required',
        message: '请输入内容',
        fn: (value) => {
          return value && value.length > 0;
        }
      },
      {
        ruleName: 'maxLength',
        message: '内容最长 200 个字符',
        fn: (value) => {
          return value && value.length <= 200;
        }
      },
      {
        ruleName: 'minLength',
        message: '内容至少1个字符',
        fn: (value) => {
          return value && value.length >= 1;
        }
      }
    ],
    captcha: [
      {
        ruleName: 'required',
        message: '请输入验证码',
        fn: (value) => {
          return value && value.length > 0;
        }
      },
      {
        ruleName: 'maxLength',
        message: '验证码最多10位',
        fn: (value) => {
          return value && value.length <= 10;
        }
      },
      {
        ruleName: 'minLength',
        message: '验证码最少1位',
        fn: (value) => {
          return value && value.length >= 1;
        }
      }
    ]
  }

  /**
   * 失去焦点触发校验
   * @param {*} key 
   * @param {*} value 
   */
  const onBlurHandler = (key, value) => {
    const temp = {
      content: {
        valid: true,
        ruleName: "",
        message: '',
      },
      captcha: {
        valid: true,
        ruleName: "",
        message: '',
      },
    };

    validators[key].forEach(validator => {
      if (!validator.fn(value)) {
        temp[key].valid = false;
        temp[key].ruleName = validator.ruleName;
        temp[key].message = validator.message;
      }
    });

    setValidationResult(temp);
  }

  const handleInputChange = (key, value) => {
    const temp = {
      ...commentData,
      [key]: value
    };
    setCommentData(temp);
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
   * 校验表单整体的合法性，只要有一个输入项不合法，表单整体标记为不合法。
   * @returns 
   */
  const validateFormAll = () => {
    let flag = true;

    for (let key in commentData) {
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

  function onSubmit(e) {
    e.preventDefault();
    console.log(commentData);

    validateFormAll();
    if (!isFormValid) {
      niceFishToast({
        severity: 'error',
        summary: 'Error',
        detail: '存在不合法的输入项，请检查',
      });
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
            <div className="form-group">
              <textarea
                rows="5"
                className="form-control"
                name="content"
                value={commentData.content}
                onBlur={(e) => onBlurHandler('content', e.target.value)}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="5-140个字符，非法字符自动截断。"
              />
              {
                !validationResult.content.valid ? <div className="text-danger">{validationResult.content.message}</div> : <></>
              }
            </div>
            {
              isMock ? <></> :
                <>
                  <div className={`form-group ${validationResult.captcha.valid ? "" : "has-error"}`}>
                    <input
                      className={`form-control`}
                      type="text"
                      placeholder="至少1位，最多4位"
                      autoComplete="off"
                      name="captcha"
                      value={commentData.captcha}
                      onChange={(e) => handleInputChange('captcha', e.target.value)}
                      onBlur={(e) => onBlurHandler('captcha', e.target.value)}
                    />
                    {
                      !validationResult.captcha.valid ? <div className="text-danger">{validationResult.captcha.message}</div> : <></>
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
