import React, { FC, useState, useEffect } from 'react';
import { commentFormValidator } from 'src/validator/comment-form-validator';
import './index.scss';
const CommonList: FC = () => {
  const [commentData, setCommentData] = useState({ comment: '' });
  const [errors, setErrors] = useState({} as any);
  const [formValid, setFormValid] = useState(false);
  const [meta, setMeta] = useState({
    comment: { touched: false, dirty: false }
  } as any);
  const [comments] = useState([
    {
      id: 1,
      postId: 1,
      content: '这是评论的内容。。。',
      date: '2016-09-09 12:00:09',
      username: '大漠'
    },
    {
      id: 2,
      postId: 1,
      content: '这是评论的内容。。。',
      date: '2016-09-09 12:00:09',
      username: '大漠2'
    },
    {
      id: 3,
      postId: 1,
      content: '这是评论的内容。。。',
      date: '2016-09-09 12:00:09',
      username: '大漠3'
    }
  ]);
  function handleChange(key: any, value: string) {
    const upcomment = {
      ...commentData,
      comment: value
    };
    setMeta({ ...meta, [key]: { ...meta[key], dirty: true } });
    setErrors(commentFormValidator(upcomment));
    setCommentData(upcomment);
  }
  function onBlur(key: any, value: any) {
    switch (key) {
      case 'comment':
        setMeta({ ...meta, [key]: { ...meta[key], touched: true } });
        setErrors(commentFormValidator(commentData));
        break;
    }
  }
  function onSubmit(e: any) {
    e.preventDefault();
  }
  useEffect(() => {
    const errors = commentFormValidator(commentData);
    const isDisabled = Object.keys(errors).some((x) => errors[x]);
    setFormValid(isDisabled);
  }, [errors]);
  return (
    <div className="add-component-container mt-16px">
      <div className="row no-gutters">
        <div className="col-md-12">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <textarea
                className="form-control"
                value={commentData.comment}
                onBlur={(e) => onBlur('comment', e.target.value)}
                onChange={(e) => handleChange('comment', e.target.value)}
                placeholder="5-140个字符，非法字符自动截断。"
              />
              {(meta.comment.touched || meta.comment.dirty) && errors.comment ? (
                <div className="text-red">{errors.comment}</div>
              ) : null}
            </div>

            <button className="btn btn-primary" disabled={formValid}>
              提交
            </button>
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
};
export default CommonList;
