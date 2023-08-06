import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import postService from 'src/app/service/post-service';
import { Galleria } from 'primereact/galleria';

import './index.scss';

export default props => {
  const { id } = useParams()
  const [images, setImages] = useState(null);
  const [postDetail, setPostDetail] = useState(
    {
      nickName: "",
      content: "",
    }
  );

  useEffect(() => {
    postService.getPostDetail(id).then(response => {
      setPostDetail(response.data);

      //整理成 Galleria 组件需要的数据格式
      let imgs = response.data.fileUploadEntities;
      let temp = [];
      imgs && imgs.map((item, index) => {
        temp.push({
          itemImageSrc: `/cms/file/download/${item.id}`,
          thumbnailImageSrc: `/cms/file/download/${item.id}`,
          alt: item.displayName,
          title: item.displayName,
        });
      });
      setImages(temp);
    });
  }, []);

  //NOTE: 不要在这里传递 style 参数，会导致组件样式错乱。
  const itemTemplate = (item) => {
    return <img src={item.itemImageSrc} alt={item.alt} />;
  }

  const thumbnailTemplate = (item) => {
    return <img src={item.thumbnailImageSrc} alt={item.alt} />;
  }

  return (
    <div className="post-detail-container">
      <div className="img-container">
        <Galleria
          value={images}
          numVisible={5}
          showThumbnails={false}
          circular
          showItemNavigators
          autoPlay
          transitionInterval={2000}
          item={itemTemplate}
          thumbnail={thumbnailTemplate}
          className='galleria-root'
        />
      </div>
      <div className='content-container'>
        <h4>
          @{(postDetail.nickName + "").trim().substring(0, 16)}
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
