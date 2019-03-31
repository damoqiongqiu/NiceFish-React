import * as React from 'react';
import {useState} from 'react';
import {Table} from 'antd';
function CommentTable(){
    const columns = [
        {
          title: "序号",
          dataIndex: "key"
        },
        {
          title: "内容",
          dataIndex: "content"
        },
        {
          title: "用户",
          dataIndex: "userName"
        },
        {
          title: "日期",
          dataIndex: "time"
        }
      ];
    
     const [data]= useState([
        { key: '1', content: '这是一条不合法的评论', userName: 'damoqiongqiu', time: '2017-07-15 16:22:58' },
        { key: '2', content: '这是一条不合法的评论', userName: 'damoqiongqiu', time: '2017-07-15 16:22:58' },
        { key: '3', content: '这是一条不合法的评论', userName: 'damoqiongqiu', time: '2017-07-15 16:22:58' },
        { key: '4', content: '这是一条不合法的评论', userName: 'damoqiongqiu', time: '2017-07-15 16:22:58' },
        { key: '5', content: '这是一条不合法的评论', userName: 'damoqiongqiu', time: '2017-07-15 16:22:58' },
        { key: '6', content: '这是一条不合法的评论', userName: 'damoqiongqiu', time: '2017-07-15 16:22:58' },
        { key: '7', content: '这是一条不合法的评论', userName: 'damoqiongqiu', time: '2017-07-15 16:22:58' },
        { key: '8', content: '这是一条不合法的评论', userName: 'damoqiongqiu', time: '2017-07-15 16:22:58' },
        { key: '9', content: '这是一条不合法的评论', userName: 'damoqiongqiu', time: '2017-07-15 16:22:58' },
        { key: '10', content: '这是一条不合法的评论', userName: 'damoqiongqiu', time: '2017-07-15 16:22:58' },
        { key: '11', content: '这是一条不合法的评论', userName: 'damoqiongqiu', time: '2017-07-15 16:22:58' },
        { key: '12', content: '这是一条不合法的评论', userName: 'damoqiongqiu', time: '2017-07-15 16:22:58' },
        { key: '13', content: '这是一条不合法的评论', userName: 'damoqiongqiu', time: '2017-07-15 16:22:58' },
        { key: '14', content: '这是一条不合法的评论', userName: 'damoqiongqiu', time: '2017-07-15 16:22:58' }
      ])
    return (<div className="comment-table-container" >
    <form className="form-vertical" role="form">
        <div className="row">
            <div className="col-md-12">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="内容，用户名"/>
                    <span className="input-group-btn">
                        <button className="btn btn-secondary" type="button"><i className="fa fa-search" ></i>
                            </button>
                    </span>
                </div>
            </div>
        </div>
    </form>
    <div className="row mt-16px">
        <div className="col-md-12">
            <div className="comment-item-container">
               <Table dataSource={data} columns={columns}></Table>
            </div>
        </div>
    </div>
</div>)
}
export default CommentTable