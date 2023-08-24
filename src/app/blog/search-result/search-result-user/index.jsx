import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { useParams, useNavigate } from 'react-router-dom';
import searchService from 'src/app/service/search-service';
import UserInfoHorizontal from 'src/app/blog/user/user-info-horizontal';
import { useTranslation } from 'react-i18next';

import './index.scss';

export default props => {
    //i18n hooks
    const { i18n } = useTranslation();

    //关键字
    const { keywords = "" } = props;

    //用户
    const [userList, setUserList] = useState([]);

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
     * 加载用户列表
     */
    useEffect(() => {
        if (!keywords) return;
        searchService.searchUser(page, rows, keywords).then(response => {
            let data = response.data;
            setTotalElements(data.totalElements);

            data = data?.content || [];
            setUserList(data);
        });
    }, [keywords]);

    return (
        <div className='row user-list-container'>
            {
                (userList && userList.length)
                    ?
                    userList.map((item, index) => {
                        return (
                            <div className='col-md-6' key={index} style={{ paddingLeft: "0" }}>
                                <UserInfoHorizontal userId={item.userId}></UserInfoHorizontal>
                            </div>
                        );
                    })
                    :
                    <div className='no-data'>{i18n.t("search.noData")}</div>
            }
        </div>
    );
}