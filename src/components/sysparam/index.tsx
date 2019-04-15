import * as React from "react";

function Sysparam() {
  return (
    <div className="sys-param-container  font-size-16">
      <div className="card">
        <div className="card-header"><h3 className="font-size-16 m-0">文章设置</h3></div>
        <div className="pd-10px md-text-align-right">
          <form  role="form">
            <div className="form-group row">
              <label className="col-md-4 col-form-label">
                文章列表显示条数：
              </label>
              <div className="col-md-8">
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="文章列表显示条数"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-md-4 col-form-label">
                文章标题最小长度：
              </label>
              <div className="col-md-8">
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="文章标题最小长度"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-md-4 col-form-label">
                文章标题最大长度：
              </label>
              <div className="col-md-8">
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="文章标题最大长度"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-md-4 col-form-label">
                每日发文数量限制：
              </label>
              <div className="col-md-8">
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="每日发文数量限制"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="card mt-16px">

        <div className="card-header"><h3 className="font-size-16 m-0">评论设置</h3></div>
        <div className="pd-10px md-text-align-right">
          <form  role="form">
            <div className="form-group row">
              <label className="col-md-4 col-form-label">评论最小长度：</label>
              <div className="col-md-8">
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="评论最小长度"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-md-4 col-form-label">评论最大长度：</label>
              <div className="col-md-8">
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="评论最大长度"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-md-4 col-form-label">
                评论列表每页显示条数：
              </label>
              <div className="col-md-8">
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="评论列表每页显示条数"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-md-4 col-form-label">
                评论时间间隔（分钟）：
              </label>
              <div className="col-md-8">
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="评论时间间隔（分钟）"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="card mt-16px">
        <div className="card-header"><h3 className="font-size-16 m-0">用户设置</h3></div>
        <div className="pd-10px md-text-align-right">
          <form  role="form">
            <div className="form-group row">
              <label className="col-md-4 col-form-label">用户名最小长度：</label>
              <div className="col-md-8">
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="用户名最小长度"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-md-4 col-form-label">用户名最大长度：</label>
              <div className="col-md-8">
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="用户名最大长度"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-md-4 col-form-label">密码最小长度：</label>
              <div className="col-md-8">
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="密码最小长度"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-md-4 col-form-label">密码最大长度：</label>
              <div className="col-md-8">
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="密码最大长度"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-md-4 col-form-label">
                个人简介最大长度：
              </label>
              <div className="col-md-8">
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="个人简介最大长度"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-md-4 col-form-label">
                新用户自动禁言时间（5分钟）：
              </label>
              <div className="col-md-8">
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="新用户自动禁言时间（5分钟）"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="pd-16px text-left">
        <button type="submit" className="btn btn-primary ">
        保存
        </button>
        <button type="button" className="btn btn-secondary ml-16px">
        取消
        </button>
      </div>
    
    </div>
  );
}
export default Sysparam;
