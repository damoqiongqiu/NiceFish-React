import React from 'react';
import Card from 'react-bootstrap/Card';
import './index.scss';

export default props => {
  //TODO:实现业务逻辑，与服务端对接。
  return (
    <div className="user-info-container">
      <Card>
        <Card.Header as="h5">作者信息</Card.Header>
        <Card.Body>
          <Card.Text>
            <p><a href="#">头像图片</a></p>
            <p><a href="#">大漠穷秋</a></p>
            <p>相看两不厌，唯有敬亭山。</p>
            <p>文章：500</p>
            <p>评论：10</p>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <button className="btn btn-primary">关注</button>
        </Card.Footer>
      </Card>
    </div>
  );
};