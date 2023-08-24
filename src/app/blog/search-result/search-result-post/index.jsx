import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import PostListItem from 'src/app/blog/post/post-list-item';
import { useParams, useNavigate } from 'react-router-dom';
import searchService from 'src/app/service/search-service';
import './index.scss';

export default props => {
    //关键字
    const { keywords = "" } = props;

    //文章列表
    const [postList, setPostList] = useState([]);

    //分页参数
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [page, setPage] = useState(1);
    const [totalElements, setTotalElements] = useState(0);

    /**
     * 分页事件
     * @param {*} event 
     */
    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
        setPage(event.page + 1);
    };

    /**
     * 加载文章列表
     */
    useEffect(() => {
        if (!keywords) return;
        searchService.searchPost(page, rows, keywords).then(response => {
            let data = response.data;
            setTotalElements(data.totalElements);

            data = data?.content || [];
            setPostList(data);
        });
    }, [keywords]);

    //瀑布流布局响应式断点 TODO:需要再优化一下
    const breakpointColumnsObj = {
        default: 6,
        1396: 4,
        1024: 3,
        768: 2,
        500: 1
    };

    return (
        <div className='post-list-container'>
            {
                (postList && postList.length)
                    ?
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column">
                        {
                            postList.map((item, index) => {
                                return (
                                    <PostListItem postDetail={item} key={index}></PostListItem>
                                );
                            })
                        }
                    </Masonry>
                    :
                    <div className='no-data'>没有找到任何内容</div>
            }
        </div>
    );
}