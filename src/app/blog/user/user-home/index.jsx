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

    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);

    // 从 redux 中获取当前登录用户
    const sessionUser = useSelector((state) => state.session.user);

    //导航对象
    const navigate = useNavigate();

    //内容列表
    const [postList, setPostList] = useState(postListMock.content);

    const user = {
        avatar: 'https://via.placeholder.com/150',
        username: '大漠穷秋',
        userId: '123456',
        city: '纽约',
        education: '东方理工大学',
        followers: 100,
        following: 200,
        likes: 500,
        bio: `从明天起，做一个幸福的人。
                喂马、劈柴，周游世界。
                从明天起，关心粮食和蔬菜。
                我有一所房子，面朝大海，春暖花开。
                从明天起，和每一个亲人通信。
                告诉他们我的幸福。
                那幸福的闪电告诉我的。
                我将告诉每一个人。
                给每一条河每一座山取一个温暖的名字。
                陌生人，我也为你祝福。
                愿你有一个灿烂的前程。
                愿你有情人终成眷属。
                愿你在尘世获得幸福。
                我只愿面朝大海，春暖花开。`,
    };

    useEffect(() => {
        userService.getUserFollowerCount(userId).then(response => {
            setFollowers(response.data);
        });
        userService.getUserFollowingCount(userId).then(response => {
            setFollowing(response.data);
        });
    }, []);

    return (
        <div className="user-home-container">
            <div className="user-info">
                <div className="user-avatar">
                    <img src={user.avatar} alt="User Avatar" />
                </div>
                <div className="user-details">
                    <span>{user.username}</span>
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
                            <span>{user.likes}</span>
                        </p>
                    </div>
                    <div className="info2">
                        <span>用户号: {user.userId}</span>
                        <span>{user.city}</span>
                        <span>{user.education}</span>
                    </div>
                    <p>{user.bio}</p>
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
