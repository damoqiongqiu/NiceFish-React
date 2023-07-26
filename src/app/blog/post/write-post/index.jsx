import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Captcha from 'src/app/utils/captcha';
import postService from 'src/app/service/post-service';
import environment from "src/environments/environment";

import './index.scss';

export default props => {
  const navigate = useNavigate();

  //FIXME:改成路由守卫的方式实现。
  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("currentUser"));
    if (!userInfo) {
      navigate('/sign-in');
    }
  }, [location]);

  const isMock = environment.isMock;
  const [post, setPost] = useState({
    title: "",
    content: "",
    captcha: ""
  });

  /**
   * 输入项的校验状态
   */
  const [validationResult, setValidationResult] = useState({
    title: {
      valid: true,
      ruleName: "",//valid 为 true 时，此项为空
      message: '',//valid 为 true 时，此项为空
    },
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
    title: [
      {
        ruleName: 'required',
        message: '请输入标题',
        fn: (value) => {
          return value && value.length > 0;
        }
      },
      {
        ruleName: 'maxLength',
        message: '标题最多128位',
        fn: (value) => {
          return value && value.length <= 128;
        }
      },
      {
        ruleName: 'minLength',
        message: '标题最少2位',
        fn: (value) => {
          return value && value.length >= 2;
        }
      }
    ],
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
        message: '内容最长20000个字符',
        fn: (value) => {
          return value && value.length <= 20000;
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
      title: {
        valid: true,
        ruleName: "",
        message: '',
      },
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
      ...post,
      [key]: value
    };
    setPost(temp);
  }

  const doWritePost = () => {
    postService.writePost(post).then(response => {
      navigate('/post');
    });
  }

  return (
    <div className="container write-post-container">
      <div className="row">
        <div className="col-md-12">
          <form role="form" noValidate className="form-horizontal">
            <div className={`form-group ${validationResult.title.valid ? "" : "has-error"}`}>
              <input
                className="form-control"
                type="text"
                required
                minLength="2"
                maxLength="128"
                placeholder="标题，2到32个字符"
                name="title"
                value={post.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                onBlur={(e) => onBlurHandler('title', e.target.value)}
              />
              {
                !validationResult.title.valid ? <div className="text-danger">{validationResult.title.message}</div> : <></>
              }
            </div>
            <div className={`form-group ${validationResult.content.valid ? "" : "has-error"}`}>
              <CKEditor
                editor={ClassicEditor}
                data={post.content}
                onReady={editor => {
                }}
                onChange={(event, editor) => {
                  handleInputChange('content', editor.getData())
                }}
                onBlur={(event, editor) => {
                  onBlurHandler('content', editor.getData())
                }}
                onFocus={(event, editor) => {
                  // console.log('Focus.', editor);
                }}
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
                      required
                      maxLength="4"
                      type="text"
                      placeholder="至少1位，最多4位"
                      autoComplete="off"
                      name="captcha"
                      value={post.captcha}
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
            <div className="form-group">
              <button type="button" className="btn btn-primary" onClick={doWritePost}>提交</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};