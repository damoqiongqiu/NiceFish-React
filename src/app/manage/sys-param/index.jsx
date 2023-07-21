import React from 'react';
import { useNavigate } from 'react-router-dom';

import './index.scss';

export default props => {
  const navigate = useNavigate();

  function cancel() {
    navigate(-1);
  }

  return (
    <div className="sys-param-container">
      <div className="panel panel-default">
        <div className="panel-heading">
          文章设置
        </div>
        <div className="panel-body">
          <form className="form-horizontal" role="form">
            <div className="form-group">
              <label className="col-md-4 control-label">文章标题最小长度：</label>
              <div className="col-md-8">
                <input type="text" required className="form-control" placeholder="文章标题最小长度" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label">文章标题最大长度：</label>
              <div className="col-md-8">
                <input type="text" required className="form-control" placeholder="文章标题最大长度" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label">文章内容最小长度：</label>
              <div className="col-md-8">
                <input type="text" required className="form-control" placeholder="文章内容最小长度" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label">文章内容最大长度：</label>
              <div className="col-md-8">
                <input type="text" required className="form-control" placeholder="文章内容最大长度" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label">文章列表显示条数：</label>
              <div className="col-md-8">
                <input type="text" required className="form-control" placeholder="文章列表显示条数" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label">每日发文数量限制：</label>
              <div className="col-md-8">
                <input type="text" required className="form-control" placeholder="每日发文数量限制" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label">每篇文章附件数量：</label>
              <div className="col-md-8">
                <input type="text" required className="form-control" placeholder="每篇文章附件数量" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label">每个附件最大体积：</label>

              <div className="col-md-8">
                <input type="text" required className="form-control" placeholder="每个附件最大体积" />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="panel panel-default">
        <div className="panel-heading">
          评论设置
        </div>
        <div className="panel-body">
          <form className="form-horizontal" role="form">
            <div className="form-group">
              <label className="col-md-4 control-label">评论最小长度：</label>
              <div className="col-md-8">
                <input type="text" required className="form-control" placeholder="评论最小长度" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label">评论最大长度：</label>
              <div className="col-md-8">
                <input type="text" required className="form-control" placeholder="评论最大长度" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label">评论列表每页显示条数：</label>
              <div className="col-md-8">
                <input type="text" required className="form-control" placeholder="评论列表每页显示条数" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label">评论时间间隔（分钟）：</label>
              <div className="col-md-8">
                <input type="text" required className="form-control" placeholder="评论时间间隔（分钟）" />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="panel panel-default">
        <div className="panel-heading">
          用户设置
        </div>
        <div className="panel-body">
          <form className="form-horizontal" role="form">
            <div className="form-group">
              <label className="col-md-4 control-label">用户名最小长度：</label>
              <div className="col-md-8">
                <input type="text" required className="form-control" placeholder="用户名最小长度" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label">用户名最大长度：</label>
              <div className="col-md-8">
                <input type="text" required className="form-control" placeholder="用户名最大长度" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label">密码最小长度：</label>
              <div className="col-md-8">
                <input type="text" required className="form-control" placeholder="密码最小长度" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label">密码最大长度：</label>
              <div className="col-md-8">
                <input type="text" required className="form-control" placeholder="密码最大长度" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label">个人简介最大长度：</label>
              <div className="col-md-8">
                <input type="text" required className="form-control" placeholder="个人简介最大长度" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label">新用户自动禁言时间（5分钟）：</label>
              <div className="col-md-8">
                <input type="text" required className="form-control" placeholder="新用户自动禁言时间" />
              </div>
            </div>
          </form>
        </div>
      </div>
      <button type="submit" className="btn btn-primary btn-margin-1rem">保存</button>
      <button type="button" className="btn btn-default" click={cancel()}>取消</button>
    </div>
  );
};