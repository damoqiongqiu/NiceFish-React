import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import { signOut } from 'src/app/shared/session/';
import signService from 'src/app/service/sign-in-service';
import niceFishPNG from 'src/assets/images/nice-fish.png';
import './index.scss';

//TODO:从服务端加载支持的语言列表
const languages = [
    { name: '汉语', value: 'zh' },
    { name: 'English', value: 'en' }
];

const NavBar = props => {
    //搜索类型、关键字
    let { searchType = "post", keywords = "" } = useParams();

    //导航对象
    const navigate = useNavigate();

    //redux hooks
    const dispatch = useDispatch();

    //sessionUser，从 redux 中获取
    const sessionUser = useSelector((state) => state.session.user);

    //i18n hooks
    const { i18n } = useTranslation();

    const [isNavExpanded, setIsNavExpanded] = useState(false);

    const toggleNav = () => {
        setIsNavExpanded(prevState => !prevState);
    };

    //当前选中的语言
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

    /**
     * 退出登录
     */
    const doSignOut = () => {
        console.log("退出登录");
        signService.signOut().then(response => {
            dispatch(signOut());
            navigate('/home');
        }, error => {
            console.error(error);
        });
    }

    const menus = [
        {
            label: i18n.t("home"),
            icon: "fa-home",
            url: "/post"
        },
        // {
        //     label: i18n.t("navbar.discover"),
        //     icon: "fa-globe",
        //     url: "/post"
        // },
        {
            label: i18n.t("navbar.follow"),
            icon: "fa-heart",
            url: "/post"
        },
        // {
        //     label: i18n.t("navbar.travel"),
        //     icon: "fa-plane",
        //     url: "/post"
        // },
        // {
        //     label: i18n.t("navbar.fitness"),
        //     icon: "fa-futbol-o",
        //     url: "/post"
        // },
        // {
        //     label: i18n.t("navbar.movies"),
        //     icon: "fa-film",
        //     url: "/post"
        // },
        // {
        //     label: i18n.t("navbar.music"),
        //     icon: "fa-music",
        //     url: "/post"
        // },
        // {
        //     label: i18n.t("navbar.food"),
        //     icon: "fa-cutlery",
        //     url: "/post"
        // },
        {
            label: i18n.t("navbar.write"),
            icon: "fa-pencil",
            url: "/write"
        }
    ];

    /**
     * 搜索
     */
    const doSearch = (e) => {
        e.preventDefault();
        if (e.key === 'Enter') {
            keywords = e.target.value;
            navigate(`/do-search/${searchType}/${keywords}`);
        }
    }

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary main-nav" fixed="top">
            <Container fluid="md">
                <Navbar.Brand href="/home">
                    <img src={niceFishPNG} width="44" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        {
                            menus.map((item, index) => {
                                return (
                                    <Nav.Link key={index} href="#" onClick={e => { navigate(item.url) }}>
                                        <i className={`fa ${item.icon}`}></i>&nbsp;
                                        {item.label}
                                    </Nav.Link>
                                );
                            })
                        }
                    </Nav>
                    <div className="d-flex justify-content-center align-items-center flex-grow-1">
                        <Form inline onSubmit={e => { e.preventDefault() }}>
                            <Form.Control
                                placeholder={i18n.t("search.label")}
                                aria-label={i18n.t("search.label")}
                                type="search"
                                className="me-5"
                                onKeyUp={doSearch}
                            />
                        </Form>
                    </div>
                    <Nav>
                        <NavDropdown title={selectedLanguage.name}>
                            {
                                languages.map((item, index) => {
                                    return (
                                        <NavDropdown.Item
                                            href="#"
                                            key={index}
                                            onClick={e => {
                                                setSelectedLanguage(item);
                                                i18n.changeLanguage(item.value);
                                            }}
                                        >
                                            {item.name}
                                        </NavDropdown.Item>
                                    );
                                })
                            }
                        </NavDropdown>
                        <Nav.Link href="https://gitee.com/mumu-osc/NiceFish-React" target="_blank">
                            <i className="fa fa-github"></i>
                        </Nav.Link>
                        {
                            sessionUser ? <>
                                <Nav.Link href="#" onClick={e => { navigate(`/user-home/${sessionUser.userId}`) }}>
                                    <i className="fa fa-user" />
                                </Nav.Link>
                                <Nav.Link href="#" onClick={e => { navigate(`/manage/chart`) }}>
                                    <i className="fa fa-cog" />
                                </Nav.Link>
                                <Nav.Link href="#" onClick={doSignOut}>
                                    <i className="fa fa-sign-out"></i>
                                </Nav.Link>
                            </> : <>
                                <Nav.Link href="#" onClick={e => { navigate(`/sign-in`) }}>
                                    <i className="fa fa-sign-in" />
                                </Nav.Link>
                                <Nav.Link href="#" onClick={e => { navigate(`/sign-up`) }}>
                                    <i className="fa fa-user-plus" />
                                </Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;