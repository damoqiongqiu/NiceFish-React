import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';

import postService from 'src/app/service/post-service';

import './index.scss';

export default props => {
  //i18n hooks
  const { i18n } = useTranslation();

  //文章列表
  const [postList, setPostList] = useState([]);

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
   * 加载文章列表
   */
  const loadData = () => {
    postService.getPostTable(page).then(response => {
      let data = response.data;
      setTotalElements(data.totalElements);

      data = data?.content || [];
      setPostList(data);
    });
  };

  useEffect(loadData, []);

  /**
   * 删除文章
   * @param {*} rowData 
   * @param {*} ri 
   */
  const delPost = (rowData, ri) => {
    confirmDialog({
      message: i18n.t('confirmDelete'),
      header: i18n.t('confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        postService.del(rowData.postId)
          .then(
            response => {
              niceFishToast({
                severity: 'success',
                summary: i18n.t('success'),
                detail: i18n.t('success'),
              });
            },
            error => {
              niceFishToast({
                severity: 'error',
                summary: i18n.t('error'),
                detail: i18n.t('fail'),
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
              <input name="searchStr" className="form-control" type="text" placeholder={i18n.t('title')} />
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
              <Column field="title" header={i18n.t('title')}></Column>
              <Column field="nickName" header={i18n.t('author')}></Column>
              <Column field="postTime" header={i18n.t('date')}></Column>
              <Column field="" header={i18n.t('operation')} body={operationTemplate}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div >
  );
};
