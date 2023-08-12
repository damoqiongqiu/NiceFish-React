import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Tag } from 'primereact/tag';
import { Tooltip } from 'primereact/tooltip';

import postService from 'src/app/service/post-service';
import fileUploadService from 'src/app/service/file-upload-service';
import Captcha from 'src/app/shared/captcha';
import ajv from "src/app/service/ajv-validate-service";

import environment from "src/environments/environment";
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
  const navigate = useNavigate();
  const isMock = environment.isMock;

  //文件最大尺寸，字节
  const fileMaxSize = 1000 * 1000 * 1000;

  //文件总大小，字节
  const [totalSize, setTotalSize] = useState(0);

  //文件上传组件
  const fileUploadRef = useRef(null);

  //已经上传的文件
  const [uploadedFiles, setUploadedFiles] = useState([]);

  //表单校验状态
  const [errors, setErrors] = useState({});

  //数据 Entity
  const [post, setPost] = useState({
    title: "",//服务端接口要求必须传 title ，可为空字符串
    content: "",
    captcha: ""
  });

  const handleInputChange = (key, value) => {
    const temp = {
      ...post,
      [key]: value
    };
    setPost(temp);
  }

  /**
   * 上传文件
   * @param {*} e 
   */
  const doUpLoadFiles = async (e) => {
    if (isMock) {
      niceFishToast({
        severity: 'error',
        summary: 'Error',
        detail: 'Mock 状态不会向服务端提交数据。',
      });
      return;
    }

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
  const doWritePost = (e) => {
    e.preventDefault();

    //mock 状态无法从服务端加载验证码，这里提供一个假的默认值
    if (isMock) {
      post.captcha = "0000";
    }

    const isValid = ajvValidate(post);
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
                <div className={`form-group ${errors.content ? "has-error" : ""}`}>
                  <textarea
                    rows="10"
                    className="form-control"
                    placeholder="说点什么吧，让大家更了解你"
                    name="content"
                    value={post.content}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  ></textarea>
                  {
                    errors.content ? <div className="text-danger">{errors.content}</div> : <></>
                  }
                </div>
                {
                  isMock ? <></> :
                    <>
                      <div className={`form-group ${errors.captcha ? "has-error" : ""}`}>
                        <input
                          className={`form-control`}
                          type="text"
                          placeholder="至少1位，最多4位"
                          autoComplete="off"
                          name="captcha"
                          value={post.captcha}
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