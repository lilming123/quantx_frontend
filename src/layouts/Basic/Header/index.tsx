import {Avatar, Layout, Popover} from 'antd';
import * as React from 'react'
import PassportController from '@/ts/controller/Passport';
import styles from './index.module.css';

import { Link } from 'react-router-dom';
import {UserOutlined} from "@ant-design/icons";
import BasicPerson from "@/layouts/Basic/Person";

const { Header } = Layout;

const BasicHeader: React.FC = () => {
    return (
        <Header className={styles['basic-header']}>
            <Link to="/home" style={{ fontSize: 22, fontWeight: 'bold', display: 'flex', alignItems: 'center' ,color: 'rgb(22, 119, 255)'}}>
                <Avatar
                    shape="square"
                    src="/img/vite.svg"
                    alt="首页"
                    size={35}
                    style={{ marginRight: 20 }}
                />
                QuantX
            </Link>
            <Link to="/home" style={{ fontSize: 15, fontWeight: 'bold', display: 'flex', alignItems: 'center' ,color: 'rgb(22, 119, 255)'}}>
                你好，{PassportController.provider.user?.username}
                <Popover content={<BasicPerson />} placement="bottom" trigger="click">
                <Avatar
                    shape="square"
                    icon={<UserOutlined />}
                    alt="首页"
                    size={35}
                    style={{ marginLeft: 15 }}
                />
                </Popover>
            </Link>
        </Header>
    );
};

export default BasicHeader;