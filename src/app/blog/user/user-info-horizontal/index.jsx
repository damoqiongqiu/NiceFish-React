import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import userService from 'src/app/service/user-service';
import './index.scss';

export default props => {
    //userId
    const { userId } = props;

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

        //检查当前用户是否已经关注
        if (sessionUser && sessionUser.userId != userId) {
            userService.existsFollow({ fromId: sessionUser.userId, toId: userId }).then(resp => {
                setFollowed(resp.data);
            });
        };
    }, [userId]);

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
    );
};
