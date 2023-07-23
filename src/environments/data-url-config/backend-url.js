/**
 * 服务端接口路径配置。
 * lodash 提供的模板字符串工具方法，可以将字符串中的 <%= %> 替换为指定的值，与传统的 JSP 标签用法非常类似。
 * @see https://lodash.com/docs/4.17.15#template
 * back-end-url.ts 与 mock-data-url.ts 中的配置项 key 必须完全一致。
 * 这些配置项会被 environment.* 中的 dataURL 属性引用。所有 *.service.ts 文件中的请求路径都会从 environment.* 中的 dataURL 属性中获取。
 */
export const dataURL = {
    postListURL: "/cms/post/post-list/<%= page %>",
    postDetailURL: "/cms/post/post-detail/<%= id %>",
    postTableURL: "/cms/post/manage/post-table/<%= page %>",
    delPostURL: "/cms/post/manage/del-post/<%= id %>",
    capchaURL: "/auth/captcha/captchaImage?type=math",
    signInURL: "/auth/shiro/login",
    signOutURL: "/auth/shiro/logout",
    getSessionUserURL: "/auth/user/get-session-user",
    testEmailURL: "",
    signUpURL: "/auth/shiro/register",
    commentListURL: "/cms/comment/manage/comment-table/<%= page %>",
    delCommentURL: "/cms/comment/manage/delete/<%= id %>",
    userListURL: "/auth/user/list/<%= page %>",
    userDetailURL: "/auth/user/detail/<%= id %>",
    updateUserURL: "/auth/user/update",
    delUserURL: "/auth/user/delete/<%= id %>",
    userMenuListURL: "/auth/shiro/menu/<%= id %>",  //用户对应的菜单
    roleTableURL: "/auth/role/list/<%= page %>",
    roleListByUserIdURL: "/auth/role/list-by-user-id/<%= userId %>",
    updateUserRoleRelationURL: "/auth/user/update-user-role-relation",
    roleDetailURL: "/auth/role/detail/<%= id %>",
    delRoleURL: "/auth/role/delete/<%= id %>",
    newRoleURL: "/auth/role/update",
    updateRoleURL: "/auth/role/update",
    apiPermissionTableURL: "/auth/api-permission/list/<%= page %>",
    apiPermissionListAll: "/auth/api-permission/list-all",
    apiPermissionListAllByRole: "/auth/api-permission/list-all-by-role",
    apiPermissionDetailURL: "/auth/api-permission/detail/<%= id %>",
    delApiPermissionURL: "/auth/api-permission/delete/<%= id %>",
    newApiPermissionURL: "/auth/api-permission/create",
    updateApiPermissionURL: "/auth/api-permission/update",
    apiRoleListURL: "/auth/role/list-by-api-id/<%= id %>",//根据 apiPermissionId 获取对应的角色列表
    compPermListURL: "/auth/component-permission/list/<%= page %>",
    compPermissionListAllByRole: "/auth/component-permission/list-all-by-role",
    compPermDetailURL: "/auth/component-permission/detail/<%= id %>",
    delCompPermURL: "/auth/component-permission/delete/<%= id %>",
    newCompPermURL: "/auth/component-permission/update",
    updateCompPermURL: "/auth/component-permission/update",
    compRoleListURL: "",
    sendEmailURL: "",
    getSysParamsURL: "/cms/param/all",
    commentListByPostIdURL: "/cms/comment/post-id/<%= postId %>/page/<%= page %>",
    writeCommentURL: "/cms/comment/write-comment",
};