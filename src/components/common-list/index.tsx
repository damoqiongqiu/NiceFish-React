import * as React from "react";
import { useState } from "react";
import './index.scss';
function CommonList() {
  const [comments] = useState([
    {
      id: 1,
      postId: 1,
      content: "这是评论的内容。。。",
      date: "2016-09-09 12:00:09",
      username: "大漠"
    },
    {
      id: 2,
      postId: 1,
      content: "这是评论的内容。。。",
      date: "2016-09-09 12:00:09",
      username: "大漠2"
    },
    {
      id: 3,
      postId: 1,
      content: "这是评论的内容。。。",
      date: "2016-09-09 12:00:09",
      username: "大漠3"
    }
  ]);
  return (
    <div className="add-component-container mt-16px">
      <div className="row no-gutters">
        <div className="col-md-12">
          <form role="form">
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="5-140个字符，非法字符自动截断。"
              />
            </div>
            <button className="btn btn-primary">提交</button>
          </form>
        </div>
      </div>
      <div className="row no-gutters">
        <div className="col-md-12">
          {comments.map((comment, index) => {
            return (
              <div className="comment-item-container" key={index}>
                <h5>{comment.content}</h5>
                <p>
                  {comment.username} {comment.date}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default CommonList;
