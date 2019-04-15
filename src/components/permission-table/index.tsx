import * as React from "react";
import { useState } from "react";
import { Table, Tag } from "antd";
function PermissionTable() {
  const [filteredInfo, setFilterdInfo] = useState({} as any);
  const [sortedInfo, setSortedInfo] = useState({} as any);
  const columns = [
    {
      title: "序号",
      dataIndex: "key",
      filteredValue: filteredInfo.key || null,
      filters: [{ text: "1", value: "1" }, { text: "2", value: "2" }],
      onFilter: (value: any, record: any) => record.key.includes(value),
      sorter: (a: any, b: any) => a.key - b.key,
      sortOrder: sortedInfo.columnKey === "key" && sortedInfo.order
    },
    {
      title: "名称",
      dataIndex: "title",
      sorter: (a: any, b: any) => a.title.localeCompare(b.title),
      sortOrder: sortedInfo.columnKey === "title" && sortedInfo.order
    },
    {
      title: "操作",
      dataIndex: "options",
      render: (options: any) => (
        <span>
          {options.map((option: any, index: any) => {
            return (
              <Tag key={index}>
                <i className={`${option.icon} `} aria-hidden="true" />
              </Tag>
            );
          })}
        </span>
      )
    }
  ];
  const [data] = useState([
    {
      key: "1",
      title: "发表文章",
      userName: "damoqiongqiu",
      options: [{ icon: "fa fa-pencil-square-o" }, { icon: "fa fa-trash" }]
    },
    {
      key: "2",
      title: "删除文章",
      userName: "damoqiongqiu",
      options: [{ icon: "fa fa-pencil-square-o" }, { icon: "fa fa-trash" }]
    }
  ]);
  function handleChange(pagination: any, filters: any, sorter: any) {
    console.log(pagination, filters, sorter);
    setFilterdInfo(filters);
    setSortedInfo(sorter);
  }
  return (
    <div className="permission-table-container">
      <form className="form-vertical" role="form">
        <div className="row">
          <div className="col-sm-8 ">
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="权限名称，权限代码"
              />
              <span className="input-group-btn">
                <button className="btn btn-secondary" type="button">
                  <i className="fa fa-search" aria-hidden="true" />
                  搜索
                </button>
              </span>
            </div>
          </div>
          <div className="col-sm-4 ">
            <div className="input-group pull-right">
              <button className="btn btn-primary" type="button">
                <i className="fa fa-user" aria-hidden="true" />
                创建权限
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="row mt-16px">
        <div className="col-md-12">
          <Table
            dataSource={data}
            columns={columns}
            onChange={handleChange}
            scroll={{ x: 500 }}
          />
        </div>
      </div>
    </div>
  );
}
export default PermissionTable;
