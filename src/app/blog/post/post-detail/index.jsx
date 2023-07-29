import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import postService from 'src/app/service/post-service';
import './index.scss';

export default props => {
  const { id } = useParams()
  const [imgFile0, setImgFile0] = useState({});
  const [titleImgURL, setTitleImgURL] = useState("");
  const [postDetail, setPostDetail] = useState(
    {
      nickName: "",
      content: "",
    }
  );

  useEffect(() => {
    postService.getPostDetail(id).then(response => {
      let postDetailTemp = response.data;
      setPostDetail(postDetailTemp);

      const imgFile0 = postDetailTemp?.fileUploadEntities[0];
      const titleImgURL = imgFile0?.id ? `/cms/file/download/${imgFile0.id}` : "";
      setImgFile0(imgFile0);
      setTitleImgURL(titleImgURL);
    });
  }, []);

  return (
    <div className="post-detail-container">
      <div className="img-container">
        {
          titleImgURL ? <img src={titleImgURL} alt={imgFile0?.fileName} /> : <></>
        }
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
