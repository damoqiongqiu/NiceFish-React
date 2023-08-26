import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { TabView, TabPanel } from 'primereact/tabview';
import { useParams, useNavigate } from 'react-router-dom';
import userService from 'src/app/service/user-service';
import postService from 'src/app/service/post-service';
import PostListItem from 'src/app/blog/post/post-list-item';
import UserInfoHorizontal from "src/app/blog/user/user-info-horizontal";
import { useTranslation } from 'react-i18next';
import './index.scss';

const UserHome = (props) => {
    //i18n hooks
    const { i18n } = useTranslation();

    //userId ，从路由参数中获取
    const { userId } = useParams();

    //导航对象
    const navigate = useNavigate();

    //我的作品列表
    const [myPostList, setMyPostList] = useState([]);

    //我的收藏列表
    const [myCollectionList, setMyCollectionList] = useState([]);

    //分页参数
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [page, setPage] = useState(1);
    const [totalElements, setTotalElements] = useState(0);

    useEffect(() => {
        postService.getPostTable(userId, page).then(response => {
            let data = response.data;
            setTotalElements(data.totalElements);

            data = data?.content || [];
            setMyPostList(data);
        });

        //TODO:分页
        userService.getUserRelatedPostList({ userId, relationType: 2 }).then(response => {
            let data = response.data || [];
            setMyCollectionList(data);
        });
    }, [userId]);

    /**
     * 瀑布流布局响应式断点
     * 这里需要与 Bootstrap 的断点对应
     */
    const breakpointColumnsObj = {
        default: 4,
        1200: 4,
        992: 3,
        768: 2,
        576: 1,
    };


    return (
        <div className="user-home-container">
            <UserInfoHorizontal userId={userId}></UserInfoHorizontal>
            <div className="tab-content">
                <TabView onBeforeTabChange={
                    e => { return e.index === 2 ? false : true; }
                }>
                    <TabPanel header={i18n.t("posts")}>
                        <div className='post-list-container'>
                            <Masonry
                                breakpointCols={breakpointColumnsObj}
                                className="my-masonry-grid"
                                columnClassName="my-masonry-grid_column">
                                {
                                    myPostList.map((item, index) => {
                                        return (
                                            <PostListItem postDetail={item} key={index}></PostListItem>
                                        );
                                    })
                                }
                            </Masonry>
                        </div>
                    </TabPanel>
                    <TabPanel header={i18n.t("saved")}>
                        <div className='post-list-container'>
                            <Masonry
                                breakpointCols={breakpointColumnsObj}
                                className="my-masonry-grid"
                                columnClassName="my-masonry-grid_column">
                                {
                                    myCollectionList.map((item, index) => {
                                        return (
                                            <PostListItem postDetail={item} key={index}></PostListItem>
                                        );
                                    })
                                }
                            </Masonry>
                        </div>
                    </TabPanel>
                    <TabPanel headerTemplate={
                        () => {
                            return (
                                <div>
                                    <input type="text" className="search-box" placeholder={`${i18n.t("searchYourPosts")}...`} />
                                </div>
                            )
                        }
                    } style={{ marginLeft: "auto" }}>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default UserHome;
