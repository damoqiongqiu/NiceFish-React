import React, { useState } from 'react';

const columns = [
  {
    title: '序号',
    dataIndex: 'key',
    filters: [
      { text: '1', value: '1' },
      { text: '2', value: '2' }
    ],
    onFilter: (value, record) => record.key.includes(value),
    sorter: (a, b) => a.key - b.key
  },
  {
    title: '内容',
    dataIndex: 'content',
    sorter: (a, b) => a.content.length - b.content.length
  },
  {
    title: '用户',
    dataIndex: 'userName',
    sorter: (a, b) => a.userName.localeCompare(b.userName)
  },
  {
    title: '日期',
    dataIndex: 'time',
    width: 182,
    fixed: 'right',
    sorter: (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
  }
];

const CommentTable = () => {
  const [data] = useState([
    {
      key: '1',
      content: '这是一条不合法的评论',
      userName: 'damoqiongqiu',
      time: '2017-07-15 16:22:58'
    },
    {
      key: '2',
      content: '这是一条合法的评论',
      userName: 'yanyunchangfeng',
      time: '2016-07-15 16:22:58'
    },
    {
      key: '3',
      content: '这是一条不合法的评论',
      userName: 'damoqiongqiu',
      time: '2015-07-15 16:22:58'
    },
    {
      key: '4',
      content: '这是一条合法的评论',
      userName: 'yanyunchangfeng',
      time: '2014-07-15 16:22:58'
    },
    {
      key: '5',
      content: '这是一条不合法的评论',
      userName: 'damoqiongqiu',
      time: '2013-07-15 16:22:58'
    },
    {
      key: '6',
      content: '这是一条合法的评论',
      userName: 'yanyunchangfeng',
      time: '2012-07-15 16:22:58'
    },
    {
      key: '7',
      content: '这是一条不合法的评论',
      userName: 'damoqiongqiu',
      time: '2011-07-15 16:22:58'
    },
    {
      key: '8',
      content: '这是一条合法的评论',
      userName: 'yanyunchangfeng',
      time: '2010-07-15 16:22:58'
    },
    {
      key: '9',
      content: '这是一条不合法的评论',
      userName: 'damoqiongqiu',
      time: '2009-07-15 16:22:58'
    },
    {
      key: '10',
      content: '这是一条合法的评论',
      userName: 'yanyunchangfeng',
      time: '2008-07-15 16:22:58'
    },
    {
      key: '11',
      content: '这是一条合法的评论',
      userName: 'damoqiongqiu',
      time: '2007-07-15 16:22:58'
    },
    {
      key: '12',
      content: '这是一条不合法的评论',
      userName: 'yanyunchangfeng',
      time: '2006-07-15 16:22:58'
    },
    {
      key: '13',
      content: '这是一条合法的评论',
      userName: 'damoqiongqiu',
      time: '2005-07-15 16:22:58'
    },
    {
      key: '14',
      content: '这是一条不合法的评论',
      userName: 'yanyunchangfeng',
      time: '2004-07-15 16:22:58'
    }
  ]);
  return (
    <div className="comment-table-container">
      <form className="form-vertical" role="form">
        <div className="row">
          <div className="col-md-12">
            <div className="input-group">
              <input className="form-control" type="text" placeholder="内容，用户名" />
              <span className="input-group-btn">
                <button className="btn btn-primary" type="button">
                  <i className="fa fa-search" />
                </button>
              </span>
            </div>
          </div>
        </div>
      </form>
      <div className="row mt-16px">
        <div className="col-md-12">
          <div className="comment-item-container">
            {/* <Table dataSource={data} columns={columns} scroll={{ x: 690 }} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommentTable;
