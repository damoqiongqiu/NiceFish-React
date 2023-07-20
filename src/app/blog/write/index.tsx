import React, { FC, useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Write: FC = () => {
  const [editorState, updateEditorState] = useState();

  function handleEditorChange(editorState: any) {
    updateEditorState(editorState);
  }

  function submitContent() {

  }

  useEffect(() => { }, []);

  return (
    <div className="container-xl write-post-container mtb-16px">
      <div className="row no-gutters">
        <div className="col-md-12">
          <form role="form">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="标题，2到32个字符" />
            </div>
            <div className="form-group border-1px-primary">
              <CKEditor
                editor={ClassicEditor}
                data=""
                onReady={editor => {
                  console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                  console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                  console.log('Focus.', editor);
                }}
              />
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
