import * as React from "react";
import { useState } from "react";
import { Table } from "antd";

function PostTable() {
    const columns = [
        {
          title: "序号",
          dataIndex: "postId"
        },
        {
          title: "标题",
          dataIndex: "title"
        },
        {
          title: "作者",
          dataIndex: "userName"
        },
        {
          title: "日期",
          dataIndex: "postTime"
        }
      ];
  const [data] = useState({
    total: 20,
    items: [
      {
        postId: 1,
        key:1,
        title: "从头了解光刻机",
        content:
          "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。<p>测试渲染HTML标签。</p>",
        postTime: "2018-05-17 10:44",
        userName: "大漠穷秋",
        nickName: "大漠穷秋",
        userId: "1",
        readTimes: "10000",
        commentTimes: "10000",
        likedTimes: "5555",
        isfamous: "true"
      },
      {
        postId: 2,
        key:2,
        title: "从头了解光刻机",
        content:
          "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
        postTime: "2018-05-17 10:44",
        userName: "大漠穷秋",
        nickName: "大漠穷秋",
        userId: "1",
        readTimes: "10000",
        commentTimes: "10000",
        likedTimes: "5555",
        isfamous: "true"
      },
      {
        postId: 3,
        key:3,
        title: "从头了解光刻机",
        content:
          "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
        postTime: "2018-05-17 10:44",
        userName: "大漠穷秋",
        nickName: "大漠穷秋",
        userId: "1",
        readTimes: "10000",
        commentTimes: "10000",
        likedTimes: "5555",
        isfamous: "true"
      },
      {
        postId: 4,
        key:4,
        title: "从头了解光刻机",
        content:
          "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
        postTime: "2018-05-17 10:44",
        userName: "大漠穷秋",
        nickName: "大漠穷秋",
        userId: "1",
        readTimes: "10000",
        commentTimes: "10000",
        likedTimes: "5555",
        isfamous: "true"
      },
      {
        postId: 5,
        key:5,
        title: "从头了解光刻机",
        content:
          "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
        postTime: "2018-05-17 10:44",
        userName: "大漠穷秋",
        nickName: "大漠穷秋",
        userId: "1",
        readTimes: "10000",
        commentTimes: "10000",
        likedTimes: "5555",
        isfamous: "true"
      },
      {
        postId: 6,
        key:6,
        title: "从头了解光刻机",
        content:
          "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
        postTime: "2018-05-17 10:44",
        userName: "大漠穷秋",
        nickName: "大漠穷秋",
        userId: "1",
        readTimes: "10000",
        commentTimes: "10000",
        likedTimes: "5555",
        isfamous: "true"
      },
      {
        postId: 7,
        key:7,
        title: "从头了解光刻机",
        content:
          "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
        postTime: "2018-05-17 10:44",
        userName: "大漠穷秋",
        nickName: "大漠穷秋",
        userId: "1",
        readTimes: "10000",
        commentTimes: "10000",
        likedTimes: "5555",
        isfamous: "true"
      },
      {
        postId: 8,
        key:8,
        title: "从头了解光刻机",
        content:
          "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
        postTime: "2018-05-17 10:44",
        userName: "大漠穷秋",
        nickName: "大漠穷秋",
        userId: "1",
        readTimes: "10000",
        commentTimes: "10000",
        likedTimes: "5555",
        isfamous: "true"
      },
      {
        postId: 9,
        key:9,
        title: "从头了解光刻机",
        content:
          "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
        postTime: "2018-05-17 10:44",
        userName: "大漠穷秋",
        nickName: "大漠穷秋",
        userId: "1",
        readTimes: "10000",
        commentTimes: "10000",
        likedTimes: "5555",
        isfamous: "true"
      },
      {
        postId: 10,
        key:10,
        title: "从头了解光刻机",
        content:
          "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
        postTime: "2018-05-17 10:44",
        userName: "大漠穷秋",
        nickName: "大漠穷秋",
        userId: "1",
        readTimes: "10000",
        commentTimes: "10000",
        likedTimes: "5555",
        isfamous: "true"
      },
      {
        postId: 11,
        key:11,
        title: "从头了解光刻机",
        content:
          "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
        postTime: "2018-05-17 10:44",
        userName: "大漠穷秋",
        nickName: "大漠穷秋",
        userId: "1",
        readTimes: "10000",
        commentTimes: "10000",
        likedTimes: "5555",
        isfamous: "true"
      }
    ]
  });


  return (
    <div className="post-table-container">
      <form className="form-vertical" role="form">
        <div className="row">
          <div className="col-md-12">
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="标题，作者"
              />
              <span className="input-group-btn">
                <button className="btn btn-secondary" type="button">
                  <i className="fa fa-search" aria-hidden="true" />
                  搜索
                </button>
              </span>
            </div>
          </div>
        </div>
      </form>
      <div className="row mt-16px">
        <div className="col-md-12">
          <div className="post-item-container">
            <Table dataSource={data.items} columns={columns} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default PostTable;
