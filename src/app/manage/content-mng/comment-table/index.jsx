import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import commentService from "src/app/service/comment-service";

import './index.scss';

export default props => {
  //评论列表
  const [commentList, setCommentList] = useState([]);

  //分页参数
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  /**
   * 分页事件
   * @param {*} event 
   */
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setPage(event.page + 1);
  };

  /**
   * 加载评论列表
   */
  const loadData = () => {
    commentService.getCommentTable(page).then(response => {
      let data = response.data;
      setTotalElements(data.totalElements);

      data = data?.content || [];
      setCommentList(data);
    });
  };

  useEffect(loadData, []);

  /**
   * 删除评论
   * @param {*} rowData 
   * @param {*} ri 
   */
  const delComment = (rowData, ri) => {
    confirmDialog({
      message: '确定要删除吗？',
      header: '确认',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        commentService.delComment(rowData.id)
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

  /**
   * 表格中的操作按钮模板
   * @param {*} item
   * @returns
   */
  const operationTemplate = (item) => {
    return (
      <>
        <Button icon="pi pi-pencil" className="p-button-success" />&nbsp;&nbsp;
        <Button icon="pi pi-trash" className="p-button-danger" onClick={() => { delComment(item) }} />
      </>
    );
  };

  return (
    <div className="comment-table-container">
      <form className="form-vertical" role="form">
        <div className="row">
          <div className="col-md-12">
            <div className="input-group">
              <input name="searchStr" className="form-control" type="text" placeholder="内容" />
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
          <div className="comment-item-container">
            <DataTable
              showGridlines
              stripedRows
              tableStyle={{ width: "100%" }}
              value={commentList}
              rows={rows}
              first={first}
              paginator={{
                totalRecords: totalElements,
                onPageChange: onPageChange
              }}
            >
              <Column field="content" header="内容"></Column>
              <Column field="nickName" header="作者"></Column>
              <Column field="time" header="日期"></Column>
              <Column field="" header="操作" body={operationTemplate}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};
