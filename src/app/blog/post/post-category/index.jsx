import React, { useState, useEffect, useCallback } from 'react';
import './index.scss';

//TODO:实现业务逻辑
export default props => {
    return (
        <div className='tag-list-container'>
            <h4>
                <a className="label label-default">推荐</a>
            </h4>
            <h4>
                <a className="label label-default">美食</a>
            </h4>
            <h4>
                <a className="label label-default">电影</a>
            </h4>
            <h4>
                <a className="label label-default">音乐</a>
            </h4>
            <h4>
                <a className="label label-default">健身</a>
            </h4>
            <h4>
                <a className="label label-default">旅行</a>
            </h4>
        </div>
    );
};
