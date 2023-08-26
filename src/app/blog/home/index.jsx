import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import PostList from 'src/app/blog/post/post-list';
import "./index.scss";

export default props => {
  return (
    <div className="row">
      <div className="col-md-9">
        <PostList />
      </div>
      <div className="col-md-3">
        <div className='sider-bar-container'>
          <Card className='mb-3'>
            <Card.Header>热门榜单</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
          </Card>
          <Card className='mb-3'>
            <Card.Header>推荐关注</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
      </div>
    </div>
  );
};
