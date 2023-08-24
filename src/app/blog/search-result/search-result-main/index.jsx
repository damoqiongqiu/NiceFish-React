import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import SearchResultPost from "src/app/blog/search-result/search-result-post";
import SearchResultUser from "src/app/blog/search-result/search-result-user";
import { useTranslation } from 'react-i18next';
import './index.scss';

export default props => {
    //i18n hooks
    const { i18n } = useTranslation();

    //搜索类型、关键字
    const { searchType = "post", keywords = "" } = useParams();

    return (
        <div className='row search-result-container'>
            <div className="col-12">
                <div className='row'>
                    <div className="col-md-12 search-type-label">
                        <NavLink to={`/do-search/post/${keywords}`}>
                            <span className={`label ${searchType === "post" ? "label-primary" : "label-default"}`}>{i18n.t("search.posts")}</span>
                        </NavLink>
                        <NavLink to={`/do-search/user/${keywords}`}>
                            <span className={`label ${searchType === "user" ? "label-primary" : "label-default"}`}>{i18n.t("search.users")}</span>
                        </NavLink>
                    </div>
                </div>
                <div className='row result-list-container'>
                    <div className="col-md-12">
                        {
                            searchType === "post" ? <SearchResultPost keywords={keywords}></SearchResultPost> : <></>
                        }
                        {
                            searchType === "user" ? <SearchResultUser keywords={keywords}></SearchResultUser> : <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}