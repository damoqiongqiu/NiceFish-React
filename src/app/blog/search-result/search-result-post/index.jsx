import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import PostListItem from 'src/app/blog/post/post-list-item';
import { useParams, useNavigate } from 'react-router-dom';
import searchService from 'src/app/service/search-service';
import { useTranslation } from 'react-i18next';

import './index.scss';

export default props => {
    //i18n hooks
    const { i18n } = useTranslation();

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
        default: 4,
        1200: 4,
        992: 3,
        768: 2,
        576: 1,
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
                    <div className='no-data'>{i18n.t("search.noData")}</div>
            }
        </div>
    );
}