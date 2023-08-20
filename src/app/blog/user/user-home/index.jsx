import React, { useEffect, useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import userService from 'src/app/service/user-service';
import PostListItem from 'src/app/blog/post/post-list-item';
import postListMock from "src/mock-data/post-list-mock.json";
import './index.scss';

const UserHome = (props) => {
    const { userId } = useParams();

    const [userDetail, setUserDetail] = useState({});
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [liked, setLiked] = useState(0);

    // 从 redux 中获取当前登录用户
    const sessionUser = useSelector((state) => state.session.user);

    //导航对象
    const navigate = useNavigate();

    //内容列表
    const [postList, setPostList] = useState(postListMock.content);

    useEffect(() => {
        userService.getUserFollowerCount(userId).then(response => {
            setFollowers(response.data);
        });
        userService.getUserFollowingCount(userId).then(response => {
            setFollowing(response.data);
        });
        userService.getUserLikedCount(userId).then(response => {
            setLiked(response.data);
        });
        userService.getUserDetails(userId).then(response => {
            setUserDetail(response.data.data);
        });
    }, []);

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
                            <span>{followers}</span>
                        </p>
                        <p>
                            <span>关注</span>
                            <span>{following}</span>
                        </p>
                        <p>
                            <span>获赞</span>
                            <span>{liked}</span>
                        </p>
                    </div>
                    <div className="info2">
                        <span>用户号: {userDetail.userId}</span>
                        <span>{userDetail.city}</span>
                        <span>{userDetail.education}</span>
                    </div>
                    <p>{userDetail.remark || "暂时没有介绍。"}</p>
                </div>
                <div className='operations'>
                    <div>
                        {
                            sessionUser
                                ?
                                <button className='btn btn-primary' onClick={() => { navigate(`/manage/user-profile/${sessionUser.userId}`); }}>编辑资料</button>
                                :
                                <></>
                        }

                    </div>
                </div>
            </div>
            <div className="tab-content">
                <TabView onBeforeTabChange={
                    e => { return e.index === 3 ? false : true; }
                }>
                    <TabPanel header="作品">
                        <div className='post-list-container'>
                            {postList.map((item, index) => {
                                return (
                                    <PostListItem postDetail={item} key={index}></PostListItem>
                                );
                            })}
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                        </div>
                    </TabPanel>
                    <TabPanel header="喜欢">
                        <p>
                            222222222222222222222222222
                        </p>
                    </TabPanel>
                    <TabPanel header="收藏">
                        <p>
                            33333333333333333333333333333333333
                        </p>
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
