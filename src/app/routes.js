import React, { lazy } from "react";
import Home from "src/app/blog/home";
import Exception404 from "src/app/utils/exception/404";
import { Route, Navigate } from "react-router-dom";

const Manage = lazy(() => import(/*webpackChunkName:'manage',webpackPrefetch:true*/ "./manage"));
const SignIn = lazy(() => import(/*webpackChunkName:'sign-in',webpackPrefetch:true*/ "./blog/user/sign-in"));
const SignUp = lazy(() => import(/*webpackChunkName:'sign-up',webpackPrefetch:true*/ "./blog/user/sign-up"));
const RetrievePwd = lazy(() =>
    import(/*webpackChunkName:'retrieve-pwd',webpackPrefetch:true*/ "./blog/user/retrieve-pwd")
);
const Write = lazy(() => import(/*webpackChunkName:'write', webpackPrefetch:true*/ "./blog/write"));
const PostTable = lazy(() =>
    import(/*webpackChunkName:'post-table',webpackPrefetch:true*/ "./manage/content-mng/post-table")
);
const Chart = lazy(() => import(/*webpackChunkName:'chart',webpackPrefetch:true*/ "./manage/chart"));
const CommentTable = lazy(() =>
    import(/*webpackChunkName:'comment-table',webpackPrefetch:true*/ "./manage/content-mng/comment-table")
);
const UserTable = lazy(() =>
    import(/*webpackChunkName:'user-table',webpackPrefetch:true*/ "./manage/permission/user-table")
);
const UserProfile = lazy(() =>
    import(/*webpackChunkName:'user-profile',webpackPrefetch:true*/ "./manage/permission/user-profile")
);
const RoleTable = lazy(() =>
    import(/*webpackChunkName:'role-table',webpackPrefetch:true*/ "./manage/permission/role-table")
);
const RoleEdit = lazy(() =>
    import(/*webpackChunkName:'role-edit',webpackPrefetch:true*/ "./manage/permission/role-edit")
);
const SysParam = lazy(() => import(/*webpackChunkName:'sys-param',webpackPrefetch:true*/ "./manage/sys-param"));
const ApiPermissionTable = lazy(() =>
    import(/*webpackChunkName:'api-permission-table',webpackPrefetch:true*/ "./manage/permission/api-permission-table")
);
const ApiPermissionEdit = lazy(() =>
    import(/*webpackChunkName:'api-permission-edit',webpackPrefetch:true*/ "./manage/permission/api-permission-edit")
);
const ComponentPermissionTable = lazy(() =>
    import(
        /*webpackChunkName:'component-permission-table',webpackPrefetch:true*/ "./manage/permission/component-permission-table"
    )
);
const ComponentPermissionEdit = lazy(() =>
    import(
        /*webpackChunkName:'component-permission-edit',webpackPrefetch:true*/ "./manage/permission/component-permission-edit"
    )
);
const PostDetailMain = lazy(() =>
    import(/*webpackChunkName:'post-detail-main',webpackPrefetch:true*/ "./blog/read/post-detail-main")
);

const routes = [
    {
        path: "/",
        element: Navigate,
        redirect: "/post",
    },
    {
        path: "/post",
        element: Home,
    },
    {
        path: "/post/post-detail/:id",
        element: PostDetailMain,
    },
    {
        path: "/home",
        element: Home,
    },
    {
        path: "/manage",
        element: Manage,
        routes: [
            {
                path: "chart",
                element: Chart,
            },
            {
                path: "post-table",
                element: PostTable,
            },
            {
                path: "comment-table",
                element: CommentTable,
            },
            {
                path: "permission/user-table",
                element: UserTable,
            },
            {
                path: "permission/user-profile",
                element: UserProfile,
            },
            {
                path: "permission/role-table",
                element: RoleTable,
            },
            {
                path: "permission/role-edit/:roleId",
                element: RoleEdit,
            },
            {
                path: "permission/api-permission-table",
                element: ApiPermissionTable,
            },
            {
                path: "permission/api-permission-edit/:permissionId",
                element: ApiPermissionEdit,
            },
            {
                path: "permission/component-permission-table",
                element: ComponentPermissionTable,
            },
            {
                path: "permission/component-permission-edit/:compPermId",
                element: ComponentPermissionEdit,
            },
            {
                path: "sys-param",
                element: SysParam,
            },
        ],
    },
    {
        path: "/sign-in",
        element: SignIn,
    },
    {
        path: "/retrieve-pwd",
        element: RetrievePwd,
    },
    {
        path: "/sign-up",
        element: SignUp,
    },
    {
        path: "/write",
        element: Write,
    },
    {
        path: "*",
        element: Exception404,
    },
];

const doRenderRoutes = (routes) => {
    return routes.map((route) => {
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
                {route.routes && doRenderRoutes(route.routes)}
            </Route>
        );
    });
};

const renderRoutes = () => {
    return doRenderRoutes(routes);
};

export default renderRoutes;
