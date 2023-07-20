import React, { FC, useState, useEffect } from 'react';
import { Editor } from 'primereact/editor';

const Write: FC = () => {
  const [text, setText] = useState('');

  return (
    <div className="container-xl write-post-container mtb-16px">
      <div className="row no-gutters">
        <div className="col-md-12">
          <form role="form">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="标题，2到32个字符" />
            </div>
            <div className="form-group border-1px-primary">
              <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '320px' }} />
            </div>
            <div className="pd-16px">
              <button type="button" className="btn btn-primary">
                提交
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Write;
