import {IRouteConfig} from "@type/globelType";
import RedirectPage from "@/pages/Redirect"
import PassportLayout from "@/layouts/Passport";
import PassportLogin from "@/pages/Passport/Login";
import PassportRegister from "@/pages/Passport/Register";
import PassportForget from "@/pages/Passport/Forget";
import {AiFillHome} from "react-icons/ai";
import React from "react";
import BasicLayout from "@/layouts/Basic";
const PassportRouter: IRouteConfig[] = [
    {
        path: '/passport/login',
        component: PassportLogin,
        exact: true,
        title: '登录',
    },
    {
        path: '/passport/register',
        component: PassportRegister,
        exact: true,
        title: '注册'
    },
    {
        path: '/passport/forget',
        component: PassportForget,
        exact: true,
        title: '忘记密码'
    }
]
const HomeRouter: IRouteConfig[] = [
    {
        path: '/home',
        title: '首页',
        icon: <AiFillHome/>,
        component: React.lazy(() => import('@/pages/Home')),
        routeParams: {}
    }
]
const Routers: IRouteConfig[] = [
    {
        path:'/',
        title:'/',
        exact: true,
        component: RedirectPage
    },
    {
        path:'/passport',
        component: PassportLayout,
        title: '通行证',
        redirect: '/passport/login',
        routes: [...PassportRouter]
    },
    {
        path: '/',
        component: BasicLayout,
        title: '通用',
        routes: [
            ...HomeRouter
        ]
    }
]

export default Routers