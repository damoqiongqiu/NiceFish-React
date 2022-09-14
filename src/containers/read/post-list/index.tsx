import React, { FC, useState, useEffect } from "react";
import { Pagination } from "antd";
import PostHeadline from "src/containers/read/post-headline";
import ListItem from "src/containers/read/post-list/components/list-item";

const PostList: FC = () => {
  const [currentPage, updateCurrentPage] = useState(1);
  const [itemPerPage, updatePerPage] = useState(10);
  const [postLists] = useState({
    total: 11,
    items: [
      {
        postId: 1,
        title: "从头了解光刻机",
        content:
          "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。<p>测试渲染HTML标签。</p>",
        postTime: "2018-05-17 10:44",
        userName: "大漠穷秋",
        userId: "1",
        readTimes: "10000",
        commentTimes: "10000",
        likedTimes: "5555",
        isfamous: "true",
      },
      {
        postId: 2,
        title: "从头了解光刻机",
        content:
          "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
        postTime: "2018-05-17 10:44",
        userName: "大漠穷秋",
        userId: "1",
        readTimes: "10000",
        commentTimes: "10000",
        likedTimes: "5555",
        isfamous: "true",
      },
      {
        postId: 3,
        title: "从头了解光刻机",
        content:
          "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
        postTime: "2018-05-17 10:44",
        userName: "大漠穷秋",
        userId: "1",
        readTimes: "10000",
        commentTimes: "10000",
        likedTimes: "5555",
        isfamous: "true",
      },
      {
        postId: 4,
        title: "从头了解光刻机",
        content:
          "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
        postTime: "2018-05-17 10:44",
        userName: "大漠穷秋",
        userId: "1",
        readTimes: "10000",
        commentTimes: "10000",
        likedTimes: "5555",
        isfamous: "true",
      },
      {
        postId: 5,
        title: "从头了解光刻机",
        content:
          "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
        postTime: "2018-05-17 10:44",
        userName: "大漠穷秋",
        userId: "1",
        readTimes: "10000",
        commentTimes: "10000",
        likedTimes: "5555",
        isfamous: "true",
      },
      {
        postId: 6,
        title: "从头了解光刻机",
        content:
          "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
        postTime: "2018-05-17 10:44",
        userName: "大漠穷秋",
        userId: "1",
        readTimes: "10000",
        commentTimes: "10000",
        likedTimes: "5555",
        isfamous: "true",
      },
      {
        postId: 7,
        title: "从头了解光刻机",
        content:
          "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
        postTime: "2018-05-17 10:44",
        userName: "大漠穷秋",
        userId: "1",
        readTimes: "10000",
        commentTimes: "10000",
        likedTimes: "5555",
        isfamous: "true",
      },
      {
        postId: 8,
        title: "从头了解光刻机",
        content:
          "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
        postTime: "2018-05-17 10:44",
        userName: "大漠穷秋",
        userId: "1",
        readTimes: "10000",
        commentTimes: "10000",
        likedTimes: "5555",
        isfamous: "true",
      },
      {
        postId: 9,
        title: "从头了解光刻机",
        content:
          "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
        postTime: "2018-05-17 10:44",
        userName: "大漠穷秋",
        userId: "1",
        readTimes: "10000",
        commentTimes: "10000",
        likedTimes: "5555",
        isfamous: "true",
      },
      {
        postId: 10,
        title: "从头了解光刻机",
        content:
          "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
        postTime: "2018-05-17 10:44",
        userName: "大漠穷秋",
        userId: "1",
        readTimes: "10000",
        commentTimes: "10000",
        likedTimes: "5555",
        isfamous: "true",
      },
      {
        postId: 11,
        title: "从头了解光刻机",
        content:
          "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
        postTime: "2018-05-17 10:44",
        userName: "大漠穷秋",
        userId: "1",
        readTimes: "10000",
        commentTimes: "10000",
        likedTimes: "5555",
        isfamous: "true",
      },
    ],
  });
  const [list, updateList] = useState([] as any);
  function onChange(page: number) {
    loadData(page);
  }
  function ShowSizeChange(current: number, pageSize: number) {
    loadData(current, pageSize);
  }
  function loadData(page: number = 1, itemPerPage: number = 10) {
    const offset = (page - 1) * 10;
    const end = page * itemPerPage;
    const data = postLists.items.slice(
      offset,
      end > postLists.total ? postLists.total : end
    );
    updateList(data);
  }
  useEffect(() => {
    loadData(currentPage, itemPerPage);
  }, []);
  return (
    <div className="post-list-container">
      <div className="row">
        <div className="col-md-12">
          <PostHeadline />
        </div>
        <div className="col-md-12">
          <ListItem list={list} />
        </div>
      </div>
      <div className="mt-16px">
        <Pagination
          total={postLists.total}
          showSizeChanger
          showQuickJumper
          onChange={onChange}
          onShowSizeChange={ShowSizeChange}
        />
      </div>
    </div>
  );
};
export default PostList;
