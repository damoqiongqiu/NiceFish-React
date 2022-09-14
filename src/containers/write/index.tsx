import React, { FC, useState, useEffect } from "react";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
const Write: FC = () => {
  const [editorState, updateEditorState] = useState();
  function handleEditorChange(editorState: any) {
    updateEditorState(editorState);
  }
  function submitContent() {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    // const htmlContent = editorState.toHTML()
    // const result = saveEditorContent(htmlContent)
  }
  useEffect(() => {
    // const htmlContent = await fetchEditorContent()
    // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorState数据
    // this.setState({
    //   editorState: BraftEditor.createEditorState(htmlContent)
    // })
  }, []);
  return (
    <div className="container-xl write-post-container mtb-16px">
      <div className="row no-gutters">
        <div className="col-md-12">
          <form role="form">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="标题，2到32个字符"
              />
            </div>
            <div className="form-group border-1px-primary">
              <BraftEditor
                value={editorState}
                onChange={handleEditorChange}
                onSave={submitContent}
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
