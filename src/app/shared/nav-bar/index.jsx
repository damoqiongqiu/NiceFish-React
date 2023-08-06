import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from 'src/app/shared/session/';

import NiceFishDropDown from 'src/app/shared/drop-down';
import signService from 'src/app/service/sign-in-service';

import niceFishPNG from 'src/assets/images/nice-fish.png';

//TODO:从服务端加载支持的语言列表
const languages = [
    { name: '汉语', value: 'zh' },
    { name: 'English', value: 'en' }
];

const NavBar = props => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const { t, i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(
        () => {
            let lng = i18n.language;
            let result = null;
            languages.forEach(item => {
                if (item.value === lng) {
                    result = item;
                }
            });
            return result;
        }
    );

    const doSignOut = () => {
        console.log("退出登录");
        signService.signOut().then(response => {
            dispatch(signOut());
            navigate('/home');
        }, error => {
            console.error(error);
        });
    }

    return (
        <div className="navbar navbar-fixed-top main-nav" role="navigation">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button className="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-responsive-collapse">
                        <span className="sr-only">Toggle Navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand-my">
                        <img src={niceFishPNG} width="45" />
                    </a>
                </div>
                <div className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li >
                            <NavLink to="/post">
                                {t("discover")}
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/write">
                                {t("write")}
                            </NavLink>
                        </li>
                    </ul >
                    <ul className="nav navbar-nav navbar-right">
                        <NiceFishDropDown
                            options={languages}
                            defaultSelection={selectedLanguage}
                            onSelection={(item) => {
                                setSelectedLanguage(item);
                                i18n.changeLanguage(item.value);
                            }}
                        ></NiceFishDropDown>
                        <li >
                            <a href="https://gitee.com/mumu-osc/NiceFish-React" target="_blank"><i className="fa fa-github"></i></a>
                        </li>
                        {
                            sessionUser ? <>
                                <li>
                                    <NavLink to="/home">
                                        <i className="fa fa-user" />
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/manage/chart">
                                        <i className="fa fa-cog" />
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink onClick={doSignOut}>
                                        <i className="fa fa-sign-out"></i>
                                    </NavLink>
                                </li>
                            </> : <>
                                <li>
                                    <NavLink to="/sign-in">
                                        <i className="fa fa-sign-in" />
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/sign-up">
                                        <i className="fa fa-user-plus" />
                                    </NavLink>
                                </li>
                            </>
                        }
                    </ul >
                </div >
            </div >
        </div >
    );
}

export default NavBar;