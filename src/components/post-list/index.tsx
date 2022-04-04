import * as React from "react";
import { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import { NavLink } from "react-router-dom";
import PostHeadline from '../post-headline';
import listImg from '../../assets/images/2.jpg';



function PostList() {
    const [currentPage, updateCurrentPage] = useState(1);
    const [itemPerpage, updatePerpage] = useState(10);
    const [postLists] = useState(
        {
            "total": 11,
            "items": [
                {
                    "postId": 1,
                    "title": "从头了解光刻机",
                    "content": "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。<p>测试渲染HTML标签。</p>",
                    "postTime": "2018-05-17 10:44",
                    "userName": "大漠穷秋",
                    "userId": "1",
                    "readTimes": "10000",
                    "commentTimes": "10000",
                    "likedTimes": "5555",
                    "isfamous": "true"
                },
                {
                    "postId": 2,
                    "title": "从头了解光刻机",
                    "content": "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
                    "postTime": "2018-05-17 10:44",
                    "userName": "大漠穷秋",
                    "userId": "1",
                    "readTimes": "10000",
                    "commentTimes": "10000",
                    "likedTimes": "5555",
                    "isfamous": "true"
                },
                {
                    "postId": 3,
                    "title": "从头了解光刻机",
                    "content": "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
                    "postTime": "2018-05-17 10:44",
                    "userName": "大漠穷秋",
                    "userId": "1",
                    "readTimes": "10000",
                    "commentTimes": "10000",
                    "likedTimes": "5555",
                    "isfamous": "true"
                },
                {
                    "postId": 4,
                    "title": "从头了解光刻机",
                    "content": "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
                    "postTime": "2018-05-17 10:44",
                    "userName": "大漠穷秋",
                    "userId": "1",
                    "readTimes": "10000",
                    "commentTimes": "10000",
                    "likedTimes": "5555",
                    "isfamous": "true"
                },
                {
                    "postId": 5,
                    "title": "从头了解光刻机",
                    "content": "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
                    "postTime": "2018-05-17 10:44",
                    "userName": "大漠穷秋",
                    "userId": "1",
                    "readTimes": "10000",
                    "commentTimes": "10000",
                    "likedTimes": "5555",
                    "isfamous": "true"
                },
                {
                    "postId": 6,
                    "title": "从头了解光刻机",
                    "content": "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
                    "postTime": "2018-05-17 10:44",
                    "userName": "大漠穷秋",
                    "userId": "1",
                    "readTimes": "10000",
                    "commentTimes": "10000",
                    "likedTimes": "5555",
                    "isfamous": "true"
                },
                {
                    "postId": 7,
                    "title": "从头了解光刻机",
                    "content": "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
                    "postTime": "2018-05-17 10:44",
                    "userName": "大漠穷秋",
                    "userId": "1",
                    "readTimes": "10000",
                    "commentTimes": "10000",
                    "likedTimes": "5555",
                    "isfamous": "true"
                },
                {
                    "postId": 8,
                    "title": "从头了解光刻机",
                    "content": "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
                    "postTime": "2018-05-17 10:44",
                    "userName": "大漠穷秋",
                    "userId": "1",
                    "readTimes": "10000",
                    "commentTimes": "10000",
                    "likedTimes": "5555",
                    "isfamous": "true"
                },
                {
                    "postId": 9,
                    "title": "从头了解光刻机",
                    "content": "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
                    "postTime": "2018-05-17 10:44",
                    "userName": "大漠穷秋",
                    "userId": "1",
                    "readTimes": "10000",
                    "commentTimes": "10000",
                    "likedTimes": "5555",
                    "isfamous": "true"
                },
                {
                    "postId": 10,
                    "title": "从头了解光刻机",
                    "content": "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
                    "postTime": "2018-05-17 10:44",
                    "userName": "大漠穷秋",
                    "userId": "1",
                    "readTimes": "10000",
                    "commentTimes": "10000",
                    "likedTimes": "5555",
                    "isfamous": "true"
                },
                {
                    "postId": 11,
                    "title": "从头了解光刻机",
                    "content": "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。",
                    "postTime": "2018-05-17 10:44",
                    "userName": "大漠穷秋",
                    "userId": "1",
                    "readTimes": "10000",
                    "commentTimes": "10000",
                    "likedTimes": "5555",
                    "isfamous": "true"
                }
            ]
        }
    );
    const [data, updateData] = useState([] as any);
    function onChange(page: any) {
        loadData(page);
    }
    function ShowSizeChange(current: any, pageSize: any) {
        loadData(current, pageSize);
    }
    function loadData(page: any = 1, itemPerpage: any = 10) {
        const offset = (page - 1) * 10;
        const end = page * itemPerpage;
        const data = postLists.items.slice(offset, end > postLists.total ? postLists.total : end);
        updateData(data);
    }
    useEffect(() => {
        loadData(currentPage, itemPerpage);
    }, [])
    return (
        <div className="post-list-container">
            <div className="row">
                <div className="col-md-12">
                    <PostHeadline />
                </div>
                <div className="col-md-12">
                    {
                        data.map((list: any, index: number) => {
                            return (
                                <div className="post-item-container mt-16px" key={index}>
                                    <div className="row">
                                        <div className="col-md-2">
                                            <img src={listImg} alt="..." className="img-thumbnail" />
                                        </div>
                                        <div className="col-md-10 post-item-text-container sm-mt-16px">
                                            <h3 className="font-size-18">
                                                <NavLink to={`/post/post-detail/${list.postId}`}>
                                                    {list.title}
                                                </NavLink>
                                            </h3>
                                            <div className="user-name-intitle">
                                                <div className="row">
                                                    <div className="col-md-4 col-lg-3 ">
                                                        <span className="fa fa-user"></span>
                                                        <span className="ml-5px">{list.userName}</span>
                                                    </div>
                                                    <div className="col-md-6 col-lg-5">
                                                        <span className="fa fa-clock-o"></span>
                                                        <span className="ml-5px">{list.postTime}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="abs">{list.content}</div>
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>

            </div>
            <div className="mt-16px">
                <Pagination size="" total={postLists.total} showSizeChanger showQuickJumper onChange={onChange} onShowSizeChange={ShowSizeChange} />
            </div>
        </div>
    );
}
export default PostList;
