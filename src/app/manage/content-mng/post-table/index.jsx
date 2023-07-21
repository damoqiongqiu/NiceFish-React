import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import './index.scss';

import postListMock from "src/mock-data/post-list-mock.json";

export default props => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    //FIXME:load data from server.
    setPostList(postListMock.content);
  }, []);

  const operationTemplate = (item) => {
    return (
      <>
        <Button icon="pi pi-pencil" className="p-button-success" />&nbsp;&nbsp;
        <Button icon="pi pi-trash" className="p-button-danger" />
      </>
    );
  };

  return (
    <div className="post-table-container">
      <form className="form-vertical" role="form">
        <div className="row">
          <div className="col-md-12">
            <div className="input-group">
              <input name="searchStr" className="form-control" type="text" placeholder="标题" />
              <span className="input-group-btn">
                <button className="btn btn-default" type="button">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </span>
            </div>
          </div>
        </div>
      </form>
      <div className="row">
        <div className="col-md-12">
          <div className="post-item-container">
            <DataTable value={postList} paginator rows={20} showGridlines stripedRows tableStyle={{ width: "100%" }}>
              <Column field="title" header="标题"></Column>
              <Column field="userName" header="作者"></Column>
              <Column field="time" header="日期"></Column>
              <Column field="" header="操作" body={operationTemplate}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div >
  );
};
