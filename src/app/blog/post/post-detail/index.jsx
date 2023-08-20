import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import postService from 'src/app/service/post-service';
import userService from 'src/app/service/user-service'
import ReactPlayer from 'react-player'
import { Galleria } from 'primereact/galleria';

import './index.scss';

export default props => {
  //导航对象
  const navigate = useNavigate();

  //postId ，从路由参数中获取
  const { id } = useParams();

  //从 redux 中获取当前登录用户
  const sessionUser = useSelector((state) => state.session.user);

  //视频 URL 地址
  const [videoURL, setVideoURL] = useState(null);

  //图片列表
  const [images, setImages] = useState(null);

  //内容详情
  const [postDetail, setPostDetail] = useState(
    {
      nickName: "",
      content: "",
    }
  );

  //是否已经点赞
  const [liked, setLiked] = useState(false);

  //是否已经收藏
  const [collected, setCollected] = useState(false);

  /**
   * 获取内容详情
   */
  useEffect(() => {
    postService.getPostDetail(id).then(response => {
      setPostDetail(response.data);

      let imgs = response.data.fileUploadEntities;
      let temp = [];
      for (let item of imgs) {
        if (item.fileSuffix === 'mp4') {//TODO: 增加视频格式
          setVideoURL(`/cms/file/download/${item.id}`);
        } else {
          //整理成 Galleria 组件需要的数据格式
          temp.push({
            itemImageSrc: `/cms/file/download/${item.id}`,
            thumbnailImageSrc: `/cms/file/download/${item.id}`,
            alt: item.displayName,
            title: item.displayName,
          });
        }
      }
      setImages(temp);
    });

    if (sessionUser) {
      //检查当前用户是否已经点赞
      userService.existsRelation({ postId: id, userId: sessionUser.userId, relationType: 1 }).then(response => {
        setLiked(response.data);
      });

      //检查当前用户是否已经收藏
      userService.existsRelation({ postId: id, userId: sessionUser.userId, relationType: 2 }).then(response => {
        setCollected(response.data);
      });
    }
  }, []);

  /**
   * 处理点赞和收藏
   * @param {*} toggleRelationType 
   */
  const handleRelation = async (toggleRelationType) => {
    //如果没有登录，跳转到登录页面
    if (!sessionUser) {
      navigate("sign-in");
      return;
    }

    if (toggleRelationType === 1) {
      if (liked) {
        await userService.deleteRelation({ postId: id, userId: sessionUser.userId, relationType: 1 }).then(response => {
          setLiked(false);
        });
      } else {
        await userService.saveRelation({ postId: id, userId: sessionUser.userId, relationType: 1 }).then(response => {
          setLiked(true);
        });
      }
    } else if (toggleRelationType === 2) {
      if (collected) {
        await userService.deleteRelation({ postId: id, userId: sessionUser.userId, relationType: 2 }).then(response => {
          setCollected(false);
        });
      } else {
        await userService.saveRelation({ postId: id, userId: sessionUser.userId, relationType: 2 }).then(response => {
          setCollected(true);
        });
      }
    }
  }

  /**
   * 图片模板
   * NOTE: 不要在这里传递 style 参数，会导致组件样式错乱。
   * @param {*} item 
   * @returns 
   */
  const itemTemplate = (item) => {
    return <img src={item.itemImageSrc} alt={item.alt} />;
  }

  /**
   * 缩略图模板
   * @param {*} item 
   * @returns 
   */
  const thumbnailTemplate = (item) => {
    return <img src={item.thumbnailImageSrc} alt={item.alt} />;
  }

  return (
    <div className="post-detail-container">
      <div className="media-container">
        {
          videoURL ?
            <ReactPlayer url={videoURL} controls className='video-root' />
            :
            <Galleria
              value={images}
              numVisible={5}
              showThumbnails={false}
              circular
              showItemNavigators
              // autoPlay
              transitionInterval={2000}
              item={itemTemplate}
              thumbnail={thumbnailTemplate}
              className='galleria-root'
            />
        }
        <ul>
          <li className="fa fa-heart" style={liked ? { color: "#f6214b" } : {}} onClick={() => { handleRelation(1); }}>
          </li>
          <li className="fa fa-star" style={collected ? { color: "#f6214b" } : {}} onClick={() => { handleRelation(2); }}>
          </li>
        </ul>
      </div>
      <div className='post-info-container'>
        <h4>
          <NavLink to={`/user-home/${postDetail.userId}`}>
            @{(postDetail.nickName + "").trim().substring(0, 16)}
          </NavLink>
        </h4>
        <div className="post-content"
          dangerouslySetInnerHTML={
            { __html: (postDetail.content + "").trim().substring(0, 120) }
          }
        >
        </div>
      </div>
    </div >
  );
};
