import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import "./index.scss";

/**
 * Bootstrap 风格的下拉组件
 * options 是一个数组，结构为： [{name:"第一项",value:'1'},{name:"第二项",value:'2'}}]
 * defaultSelection 是一个对象，结构为： {name:"第一项",value:'1'}
 * onSelection 是一个函数，用于接收用户选择的结果，回调时会传入一个对象，结构为： {name:"第一项",value:'1'}
 * open 是一个布尔值，用于控制组件的展开状态
 * @param {*} props 
 * @returns 
 */
const NiceFishDropDown = props => {
    const { t } = useTranslation();
    const { options, defaultSelection, onSelection, open } = props;
    const [isOpen, setIsOpen] = useState(open);
    const [selectedItem, setSelectedItem] = useState(defaultSelection);

    return (
        <li className={`dropdown ${isOpen ? "open" : ""}`}>
            <Link className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedItem?.name ? selectedItem.name : t("changeLanguage")}
                <span className="caret"></span>
            </Link>
            <ul className="dropdown-menu">
                {
                    options.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link onClick={
                                    () => {
                                        setIsOpen(false);
                                        setSelectedItem(item);
                                        onSelection(item);
                                    }
                                }
                                    style={{
                                        backgroundColor: "#fff",
                                        color: "#000"
                                    }}
                                >{item.name}</Link>
                            </li>
                        );
                    })
                }
            </ul>
        </li>
    );
}

export default NiceFishDropDown;