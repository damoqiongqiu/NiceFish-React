import React, { Suspense, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { BlockUI } from 'primereact/blockui';
import { ProgressSpinner } from 'primereact/progressspinner';

import ErrorBoundary from 'src/app/shared/ErrorBoundary';
import NavBar from 'src/app/shared/nav-bar';
import Footer from 'src/app/shared/footer';
import NiceFishRoutes from 'src/app/routes';
import signService from 'src/app/service/sign-in-service';

import './index.scss';

const App = props => {
  const { t } = useTranslation();
  const toast = useRef(null);
  const location = useLocation();
  const [blocked, setBlocked] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    //TODO:把 currentUser 移动到 Context 中。
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, [location]);

  useEffect(() => {
    //FIXME:全局公用方法有更好的封装？？？
    window.niceFishToast = (params) => {
      toast.current.show(params);
    };
    window.showGlobalSpin = () => {
      setBlocked(true);
    }
    window.hideGlobalSpin = () => {
      setBlocked(false);
    }
  }, []);

  const doSignOut = () => {
    console.log("退出登录");
    signService.signOut().then(response => {
      localStorage.removeItem("currentUser");
      setCurrentUser(null);
    }, error => {
      console.error(error);
    });
  }

  return (
    <>
      {/* 全局公用的弹出消息 */}
      <Toast ref={toast} position="top-center" />

      {/* 全局公用的确认框 */}
      <ConfirmDialog dismissableMask />

      {/* 全局遮罩 */}
      <>
        <ProgressSpinner style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          zIndex: 10000000,
          marginLeft: "-50px",
          marginTop: "-50px",
          display: blocked ? "block" : "none"
        }}></ProgressSpinner>
        <BlockUI blocked={blocked} fullScreen >
        </BlockUI >
      </>

      {/* 顶部一级导航条 */}
      <NavBar></NavBar>

      {/* 主体内容区域 */}
      <div className="container-fluid main-container">
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="loading-container d-flex align-items-center justify-content-center">
              </div>
            }
          >
            <NiceFishRoutes />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* 页面底部区域 */}
      <Footer></Footer>
    </>
  );
}

export default App;