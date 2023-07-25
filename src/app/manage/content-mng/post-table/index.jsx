import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';

import postService from 'src/app/service/post-service';

import './index.scss';

export default props => {
  const [postList, setPostList] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setPage(event.page + 1);
  };

  const loadData = () => {
    postService.getPostTable(page).then(response => {
      let data = response.data;
      setTotalElements(data.totalElements);

      data = data?.content || [];
      setPostList(data);
    });
  };

  useEffect(loadData, []);

  const delPost = (rowData, ri) => {
    confirmDialog({
      message: '确定要删除吗？',
      header: '确认',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        postService.del(rowData.postId)
          .then(
            response => {
              niceFishToast({
                severity: 'success',
                summary: 'Success',
                detail: '删除成功',
              });
            },
            error => {
              niceFishToast({
                severity: 'error',
                summary: 'Error',
                detail: '删除失败',
              });
            }
          )
          .finally(loadData);
      },
      reject: () => {
        console.log("reject");
      }
    });
  }

  const operationTemplate = (item) => {
    return (
      <>
        <Button icon="pi pi-pencil" className="p-button-success" onClick={() => { }} />&nbsp;&nbsp;
        <Button icon="pi pi-trash" className="p-button-danger" onClick={() => { delPost(item) }} />
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
            <DataTable
              showGridlines
              stripedRows
              tableStyle={{ width: "100%" }}
              value={postList}
              rows={rows}
              first={first}
              paginator={{
                totalRecords: totalElements,
                onPageChange: onPageChange
              }}
            >
              <Column field="title" header="标题"></Column>
              <Column field="nickName" header="作者"></Column>
              <Column field="postTime" header="日期"></Column>
              <Column field="" header="操作" body={operationTemplate}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div >
  );
};
