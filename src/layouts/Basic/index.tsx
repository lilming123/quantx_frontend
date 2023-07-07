import { Layout, Spin } from 'antd';
import { useEffect, useState } from 'react';
import * as React from 'react'
import { IRouteConfig } from 'typings/globelType';
import BasicHeader from './Header';
import styles from './index.module.css';
import orgCtrl from '@/ts/controller/Passport';
import {renderRoutes} from "react-router-config";
import BasicSider from "./Sider";
import {Content} from "antd/es/layout/layout";
import {hs300_return} from "@/assets/hs300_return";

type BasicLayoutProps = {
    route: IRouteConfig;
    history: any;
};

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
    const { route, history } = props;
    const [fromData, setFromData] = useState<any|null>(hs300_return);
    const [inited, setInited] = useState(false);
    useEffect(() => {
        if (!orgCtrl.logined) {
            return history.push('/passport/login');
        }
        setTimeout(() => {
            setInited(true);
        }, 500);
    }, []);
    return (
        <Layout className={styles['page-layout']}>
            {inited ? (
                <>
                    {/* 公共头部 */}
                    <BasicHeader />
                    <Layout >
                    <BasicSider fromData={fromData} setFromData={setFromData}/>
                    {/* 内容区域 */}
                        <Content>{route && renderRoutes(route.routes,{fromData})}</Content>
                    </Layout>
                </>
            ) : (
                <Spin
                    tip="加载中,请稍后..."
                    size="large"
                    style={{ marginTop: 'calc(50vh - 50px)' }}></Spin>
            )}
        </Layout>
    );
};

export default BasicLayout;