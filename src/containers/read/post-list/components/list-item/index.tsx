import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import listImg from "src/assets/images/list-item.jpg";
import { ListItemProps } from "../../domain";
const ListItem: FC<ListItemProps> = ({ list }) => {
  return (
    <>
      {list.map((item, index: number) => {
        return (
          <div className="post-item-container mt-16px" key={index}>
            <div className="row">
              <div className="col-md-2">
                <img src={listImg} alt="..." className="img-thumbnail" />
              </div>
              <div className="col-md-10 post-item-text-container sm-mt-16px">
                <h3 className="font-size-18">
                  <NavLink to={`/post/post-detail/${item.postId}`}>
                    {item.title}
                  </NavLink>
                </h3>
                <div className="user-name-intitle">
                  <div className="row">
                    <div className="col-md-4 col-lg-3 ">
                      <span className="fa fa-user"></span>
                      <span className="ml-5px">{item.userName}</span>
                    </div>
                    <div className="col-md-6 col-lg-5">
                      <span className="fa fa-clock-o"></span>
                      <span className="ml-5px">{item.postTime}</span>
                    </div>
                  </div>
                </div>
                <div className="abs">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ListItem;
