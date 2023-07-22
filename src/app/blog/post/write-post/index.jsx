import React, { FC, useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './index.scss';

export default props => {
  const [text, setText] = useState('');

  return (
    <div className="container write-post-container">
      <div className="row">
        <div className="col-md-12">
          <form role="form" noValidate>
            <div className="form-group">
              <input
                required minLength="2" maxLength="32"
                name="title"
                type="text"
                className="form-control"
                placeholder="标题，2到32个字符" />
            </div>
            <div className="form-group">
              <CKEditor
                editor={ClassicEditor}
                // data="<p>Hello from CKEditor 5!</p>"
                onReady={editor => {
                  // You can store the "editor" and use when it is needed.
                  console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log({ event, editor, data });
                  //setText()???
                }}
                onBlur={(event, editor) => {
                  console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                  console.log('Focus.', editor);
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary">提交</button>
          </form>
        </div>
      </div>
    </div>
  );
};