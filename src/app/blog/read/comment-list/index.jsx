import React, { FC, useState, useEffect } from 'react';
import { commentFormValidator } from 'src/app/utils/validator/comment-form-validator';
import './index.scss';

//mock-data
import commentList from 'src/mock-data/comment-list-mock.json';

const CommentList = () => {
  const [commentData, setCommentData] = useState({ comment: '' });
  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);
  const [meta, setMeta] = useState({
    comment: { touched: false, dirty: false }
  });


  function handleChange(key, value) {
    const upcomment = {
      ...commentData,
      comment: value
    };
    setMeta({ ...meta, [key]: { ...meta[key], dirty: true } });
    setErrors(commentFormValidator(upcomment));
    setCommentData(upcomment);
  }

  function onBlur(key, value) {
    switch (key) {
      case 'comment':
        setMeta({ ...meta, [key]: { ...meta[key], touched: true } });
        setErrors(commentFormValidator(commentData));
        break;
    }
  }
  function onSubmit(e) {
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
          {commentList.content.map((comment, index) => {
            return (
              <div className="comment-item-container" key={index}>
                <p>
                  {comment.userName} {comment.time}
                </p>
                <h5>{comment.content}</h5>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default CommentList;
