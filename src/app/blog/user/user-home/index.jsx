import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { TabView, TabPanel } from 'primereact/tabview';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import userService from 'src/app/service/user-service';
import postService from 'src/app/service/post-service';
import PostListItem from 'src/app/blog/post/post-list-item';
import './index.scss';

const UserHome = (props) => {
    //userId ，从路由参数中获取
    const { userId } = useParams();

    //用户详情
    const [userDetail, setUserDetail] = useState({});

    //粉丝数
    const [followerCount, setFollowerCount] = useState(0);

    //关注数
    const [followingCount, setFollowingCount] = useState(0);

    //获赞数
    const [likedCount, setLikedCount] = useState(0);

    //从 redux 中获取当前登录用户
    const sessionUser = useSelector((state) => state.session.user) || {};

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

    //是否已经关注
    const [followed, setFollowed] = useState(false);

    useEffect(() => {
        userService.getUserFollowerCount(userId).then(response => {
            setFollowerCount(response.data);
        });
        userService.getUserFollowingCount(userId).then(response => {
            setFollowingCount(response.data);
        });
        userService.getUserLikedCount(userId).then(response => {
            setLikedCount(response.data);
        });
        userService.getUserDetails(userId).then(response => {
            setUserDetail(response.data.data);
        });

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

        //检查当前用户是否已经关注
        if (sessionUser && sessionUser.userId != userId) {
            userService.existsFollow({ fromId: sessionUser.userId, toId: userId }).then(resp => {
                setFollowed(resp.data);
            });
        };
    }, [userId]);

    //瀑布流布局响应式断点 TODO:需要再优化一下
    const breakpointColumnsObj = {
        default: 6,
        1396: 4,
        1024: 3,
        768: 2,
        500: 1
    };

    /**
     * 处理用户关注和取消关注操作
     * @returns 
     */
    const handleFollow = async () => {
        //如果没有登录，跳转到登录页面
        if (!sessionUser) {
            navigate("sign-in");
            return;
        }
        if (followed) {
            await userService.unfollow({ fromId: sessionUser.userId, toId: userId }).then(response => {
                setFollowed(false);
            });
        } else {
            await userService.follow({ fromId: sessionUser.userId, toId: userId }).then(response => {
                setFollowed(true);
            });
        }
    }

    return (
        <div className="user-home-container">
            <div className="user-info">
                <div className="user-avatar">
                    <img src={userDetail.avatarURL || 'https://via.placeholder.com/150'} alt="User Avatar" />
                </div>
                <div className="user-details">
                    <span>{userDetail.nickName}</span>
                    <div className="user-stats">
                        <p>
                            <span>粉丝</span>
                            <span>{followerCount}</span>
                        </p>
                        <p>
                            <span>关注</span>
                            <span>{followingCount}</span>
                        </p>
                        <p>
                            <span>获赞</span>
                            <span>{likedCount}</span>
                        </p>
                    </div>
                    <div className="info2">
                        <span>用户号: {userDetail.userId}</span>
                        <span>{userDetail.city}</span>
                        <span>{userDetail.education}</span>
                    </div>
                    <p>{userDetail.remark || "暂时没有介绍。"}</p>
                    <div className='operations'>
                        <div>
                            {
                                followed
                                    ?
                                    <>
                                        <button className='btn btn-default' onClick={handleFollow}>已关注</button>
                                    </>
                                    :
                                    <></>
                            }
                            {
                                ((sessionUser?.userId != userId) && !followed)
                                    ?
                                    <>
                                        <button className='btn btn-primary' onClick={handleFollow}>关注</button>
                                    </>
                                    :
                                    <></>
                            }
                            {
                                (sessionUser && sessionUser.userId == userId)
                                    ?
                                    <button className='btn btn-primary' onClick={() => { navigate(`/manage/user-profile/${sessionUser.userId}`); }}>编辑资料</button>
                                    :
                                    <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="tab-content">
                <TabView onBeforeTabChange={
                    e => { return e.index === 2 ? false : true; }
                }>
                    <TabPanel header="作品">
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
                    <TabPanel header="收藏">
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
                                    <input type="text" className="search-box" placeholder="搜索你的作品..." />
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
