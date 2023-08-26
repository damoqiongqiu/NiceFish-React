import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { Card, ListGroup } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostListItem from 'src/app/blog/post/post-list-item';
import postService from 'src/app/service/post-service';
import './index.scss';

/**
 * 瀑布流布局响应式断点
 * 这里需要与 Bootstrap 的断点对应
 */
const breakpointColumnsObj = {
  default: 5,
  1400: 5,
  1200: 4,
  992: 3,
  768: 2,
  576: 1,
};

export default props => {
  //文章列表
  const [postList, setPostList] = useState([]);

  //滚动加载，是否还有更多数据
  const [hasMore, setHasMore] = useState(true);

  //瀑布流布局中的项目
  const [masonryItems, setMasonryItems] = useState([]);

  //分页参数
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(20);
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  //计算瀑布流当前有几列
  const [currentColumns, setCurrentColumns] = useState(breakpointColumnsObj.default);

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    let columns = breakpointColumnsObj.default;

    for (const breakpoint in breakpointColumnsObj) {
      if (screenWidth <= parseInt(breakpoint)) {
        columns = breakpointColumnsObj[breakpoint];
        break;
      }
    }

    setCurrentColumns(columns);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * 加载文章列表
   */
  const fetchMoreData = async () => {
    let temp = page + 1;
    setPage(temp);

    await postService.getPostList(temp, rows).then(response => {
      let data = response.data;
      setTotalElements(data.totalElements);

      setHasMore(!data.last);

      data = data?.content || [];
      setPostList([...postList, ...data]);
    });
  }

  useEffect(() => {
    fetchMoreData();
  }, []);

  useEffect(() => {
    let temp = postList.map((item, index) => {
      return (
        <PostListItem postDetail={item} key={index}></PostListItem>
      );
    });
    temp.splice(currentColumns - 1, 0,
      // 固定在瀑布流右上角的静态内容
      <>
        <Card className='mb-3 masonry-item'>
          <Card.Header>热门榜单</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
        </Card>

        <Card className='mb-3 masonry-item'>
          <Card.Header>推荐关注</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
        </Card>
      </>
    );
    setMasonryItems(temp);
  }, [postList, currentColumns]);

  return (
    <div className='post-list-container'>
      <InfiniteScroll
        dataLength={postList.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        style={{ overflow: "inherit" }}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          {
            masonryItems.map((item, index) => {
              return (
                <React.Fragment key={index} >
                  {item ? item : <></>}
                </React.Fragment>
              );
            })
          }
        </Masonry>
      </InfiniteScroll>
    </div >
  );
};
