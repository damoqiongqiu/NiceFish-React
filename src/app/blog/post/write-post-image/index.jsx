import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import { Tooltip } from 'primereact/tooltip';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import postService from 'src/app/service/post-service';
import fileUploadService from 'src/app/service/file-upload-service';
import Captcha from 'src/app/shared/captcha';

import environment from "src/environments/environment";

import './index.scss';

export default props => {
  const navigate = useNavigate();
  const isMock = environment.isMock;
  const fileMaxSize = 1000 * 1000 * 1000;//文件最大尺寸，字节
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isFormValid, setFormValid] = useState(true);
  const [post, setPost] = useState({
    title: "",
    content: "",
    captcha: ""
  });

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

  const handleInputChange = (key, value) => {
    const temp = {
      ...post,
      [key]: value
    };
    setPost(temp);
  }

  /**
   * 校验表单整体的合法性，只要有一个输入项不合法，表单整体标记为不合法。
   * @returns 
   */
  const validateFormAll = () => {
    let flag = true;

    for (let key in post) {
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
   * 上传文件
   * @param {*} e 
   */
  const doUpLoadFiles = async (e) => {
    fileUploadService.uploadFiles(e.files).then(
      response => {
        if (response && response.data.success) {
          setUploadedFiles([...uploadedFiles, ...response.data.data]);
        } else {
          console.error(response);
        }
      },
      error => {
        console.error(error);
      }
    ).finally(() => {
      fileUploadRef.current.clear();
    });
  }

  /**
   * 整理并提交所有数据
   */
  const doWritePost = () => {
    //TODO:表单校验看起来没有生效
    validateFormAll();
    if (!isFormValid) {
      niceFishToast({
        severity: 'error',
        summary: 'Error',
        detail: '存在不合法的输入项，请检查',
      });
      return;
    }
    if (!uploadedFiles.length) {
      niceFishToast({
        severity: 'error',
        summary: 'Error',
        detail: '请至少上传一张图片',
      });
      return;
    }

    //把上传的图片列表带上
    post.fileUploadEntities = uploadedFiles;

    postService.writePost(post).then(
      response => {
        //TODO:需要改接口，返回统一的 AjaxResult 数据格式，影响所有前端页面
        if (response && response.status === 200) {
          niceFishToast({
            severity: 'success',
            summary: 'Success',
            detail: '发布成功',
          });
          navigate('/post');
        } else {
          niceFishToast({
            severity: 'error',
            summary: 'Error',
            detail: response + "",
          });
          console.error(response);
        }
      },
      error => {
        niceFishToast({
          severity: 'error',
          summary: 'Error',
          detail: error + "",
        });
        console.error(error);
      }
    );
  }

  return (
    <div className="container-fluid write-post-container">
      <div className="row">
        <div className="col-md-10">
          <div className="row">
            <div className="col-md-12">
              {/* 图片列表，展示已经上传的图片，HTML 模板套用下面的上传组件，TODO:实现一个更美观的图片列表展示方式 */}
              <div className='uploaded-image-container'>
                {
                  uploadedFiles.map((file, index) => (
                    <div className='p-fileupload-row' key={index}>
                      <div>
                        {
                          file.fileSuffix === "mp4" ?
                            <video controls style={{
                              width: " 100%",
                              height: "100%",
                              position: "absolute",
                              top: 0,
                              left: 0
                            }}>
                              <source src={`/cms/file/download/${file.id}`} />
                            </video>
                            :
                            <img
                              alt={file.name}
                              role="presentation"
                              src={`/cms/file/download/${file.id}`}
                            />
                        }
                        <Tag
                          value={file.fileSize + " Bytes"}
                          severity="warning"
                          style={
                            {
                              position: "absolute",
                              left: "5px",
                              top: "5px",
                            }
                          }
                        />
                        <Button
                          type="button"
                          icon="pi pi-times"
                          className="p-button-outlined p-button-rounded p-button-danger"
                          style={
                            {
                              position: "absolute",
                              right: "0px",
                              top: "5px",
                            }
                          }
                          onClick={() => {
                            uploadedFiles.splice(index, 1);
                            setUploadedFiles([...uploadedFiles]);
                          }}
                        />
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <>
            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />
            <FileUpload
              className="file-uploader"
              ref={fileUploadRef}
              multiple
              accept="image/*,video/mp4"
              maxFileSize={fileMaxSize}
              customUpload={true} //自己手动处理上传
              mode="basic"
              onUpload={
                (e) => {
                  let _totalSize = 0;

                  e.files.forEach((file) => {
                    _totalSize += file.size || 0;
                  });

                  setTotalSize(_totalSize);
                }
              }
              onSelect={
                (e) => {
                  let _totalSize = totalSize;
                  let files = e.files;

                  Object.keys(files).forEach((key) => {
                    _totalSize += files[key].size || 0;
                  });

                  setTotalSize(_totalSize);
                  doUpLoadFiles(e);
                }
              }
              onError={
                (e) => {
                  niceFishToast({
                    severity: 'error',
                    summary: 'Error',
                    detail: e,
                  });
                  setTotalSize(0);
                }
              }
              onClear={
                (e) => {
                  setTotalSize(0);
                }
              }
              chooseOptions={{
                icon: 'pi pi-fw pi-images',
                iconOnly: false,
                className: 'custom-choose-btn p-button-rounded p-button-outlined',
                label: '选择图片或视频文件',
              }}
            />
          </>
          <div className='row'>
            <p className='text-danger'>上传视频时，只能上传一个视频文件，如果上传多个，系统会自动忽略，只展示第一个视频。</p>
          </div>
          <div className="row">
            <div className="col-md-12">
              <form role="form" noValidate className="form-horizontal">
                <div className={`form-group ${validationResult.content.valid ? "" : "has-error"}`}>
                  <textarea
                    rows="10"
                    className="form-control"
                    placeholder="说点什么吧，让大家更了解你"
                    name="content"
                    value={post.content}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    onBlur={(e) => validateField(e.target.name, e.target.value)}
                  ></textarea>
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
        <div className="col-md-2">
          {/* 规则描述 */}
          <div className="online-contact-container">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">规则描述</h3>
              </div>
              <div className="list-group">
                <li className="list-group-item">
                  平台规则一
                </li>
                <li className="list-group-item">
                  平台规则一
                </li>
                <li className="list-group-item">
                  平台规则一
                </li>
                <li className="list-group-item">
                  平台规则一
                </li>
                <li className="list-group-item">
                  平台规则一
                </li>
                <li className="list-group-item">
                  平台规则一
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};