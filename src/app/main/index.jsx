import React, { Suspense, lazy } from 'react';
import Header from 'src/app/main/header';
import Footer from 'src/app/main/footer';
import Home from 'src/app/blog/home';
import Exception404 from 'src/app/utils/exception/404';
import ErrorBoundary from '../utils/ErrorBoundary';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const Manage = lazy(() => import(/*webpackChunkName:'manage,webpackPrefetch:true'*/ '../manage'));
const Login = lazy(() => import(/*webpackChunkName:'login'*/ '../blog/user/login'));
const Register = lazy(() => import(/*webpackChunkName:'register'*/ '../blog/user/register'));
const Forgot = lazy(() => import(/*webpackChunkName:'forgot'*/ '../blog/user/forgot'));
const Write = lazy(() => import(/*webpackChunkName:'write', webpackPrefetch:true*/ '../blog/write'));
const PostTable = lazy(() => import(/*webpackChunkName:'post-table'*/ '../manage/content-mng/post-table'));
const Chart = lazy(() => import(/*webpackChunkName:'chart',webpackPrefetch:true*/ '../manage/chart'));
const CommentTable = lazy(() => import(/*webpackChunkName:'comment-table'*/ '../manage/content-mng/comment-table'));
const Profile = lazy(() => import(/*webpackChunkName:'profile'*/ '../manage/permission/user-profile'));
const RoleTable = lazy(() => import(/*webpackChunkName:'role-page'*/ '../manage/permission/role-table'));
const RoleEdit = lazy(() => import(/*webpackChunkName:'role-page'*/ '../manage/permission/role-edit'));
const Sysparam = lazy(() => import(/*webpackChunkName:'sysparam'*/ '../manage/sysparam'));
const PermissionTable = lazy(() => import(/*webpackChunkName:'permission-page'*/ '../manage/permission/permission-table'));
const PermissionEdit = lazy(() => import(/*webpackChunkName:'permission-page'*/ '../manage/permission/permission-edit'));
const UserTable = lazy(() => import(/*webpackChunkName:'user-table'*/ '../manage/permission/user-table'));
const PostDetailMain = lazy(() => import(/*webpackChunkName:'post-detail-main'*/ '../blog/read/post-detail-main'));

const routes = [
  {
    path: '/',
    element: Navigate,
    redirect: '/post'
  },

  {
    path: '/post',
    element: Home
  },
  {
    path: '/post/post-detail/:id',
    element: PostDetailMain
  },
  {
    path: '/home',
    element: Home
  },
  {
    path: '/manage',
    element: Manage,
    routes: [
      {
        path: 'chart',
        element: Chart
      },
      {
        path: 'post-table',
        element: PostTable
      },
      {
        path: 'comment-table',
        element: CommentTable
      },
      {
        path: 'profile',
        element: Profile
      },
      {
        path: 'user-table',
        element: UserTable
      },
      {
        path: 'user-table/edituser/:userId',
        element: Profile
      },
      {
        path: 'role-table',
        element: RoleTable
      },
      {
        path: 'role-edit/:roleId',
        element: RoleEdit
      },
      {
        path: 'permission-table',
        element: PermissionTable
      },
      {
        path: 'permission-edit/:permissionId',
        element: PermissionEdit
      },
      {
        path: 'sysparam',
        element: Sysparam
      }
    ]
  },
  {
    path: '/login',
    element: Login
  },
  {
    path: '/forgot',
    element: Forgot
  },
  {
    path: '/register',
    element: Register
  },
  {
    path: '/write',
    element: Write
  },
  {
    path: '*',
    element: Exception404
  }
];

const renderSubRoute = (route) => {
  return (
    <Route
      key={route.path}
      path={route.path}
      element={
        route.redirect ? (
          <>
            <Navigate to={`${route.redirect}`} replace />
          </>
        ) : (
          <route.element />
        )
      }
    >
      {renderRoute(route.routes)}
    </Route>
  );
};
const renderRoute = (routes) => {
  return routes.map((route) => {
    if (route.routes) return renderSubRoute(route);
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.redirect ? (
            <>
              <Navigate to={`${route.redirect}`} replace />
            </>
          ) : (
            <route.element />
          )
        }
      ></Route>
    );
  });
};

function App() {
  return (
    <div className="layout-warpper">
      <Router>
        <Header />
        <div className="main">
          <ErrorBoundary>
            <Suspense
              fallback={
                <div className="loading-container d-flex align-items-center justify-content-center">
                  {/* <Spin size="large" /> */}
                </div>
              }
            >
              <Routes>{renderRoute(routes)}</Routes>
            </Suspense>
          </ErrorBoundary>
        </div>
        <Footer />
      </Router>
    </div>
  );
}
export default App;
