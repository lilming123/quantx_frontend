import { AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import { Button, Checkbox, Form, Input, message, Tabs } from 'antd';
import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import PassportController from '@/ts/controller/Passport';

import cls from './index.module.css';

const PassportLogin: React.FC = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token');
            if (token !== null){
                const res = await PassportController.checkToken(token);
                if (res.data.error){
                    message.warning(res.data.error)
                }else{
                    const user = res.data.user
                    console.log(user)
                    PassportController.provider.loadUser(user)
                    message.success(res.data.success)
                    history.push('/home' )
                }
            }
        };
        checkToken()
    },[history]);

    return (
        <div>
            <Tabs size="large" items={[{ label: '账号密码登录', key: 'account' }]} />
            <Form
                onFinish={async ({ account, password }) => {
                    if (account && password) {
                        setLoading(true);
                        const res = await PassportController.login(account, password);
                        setLoading(false);
                        if (res.data.error) {
                            message.warning(res.data.error);
                        }
                        else {
                            const user = res.data.user
                            console.log(user)
                            PassportController.provider.loadUser(user)
                            message.success(res.data.success) 
                            localStorage.setItem('token', res.data.token);
                            history.push('/home' );
                        }
                    } else {
                        message.warning('请填写账号和密码 ！');
                    }
                }}>
                <Form.Item name="account" rules={[{ required: true, message: '请输入邮箱' }]}>
                    <Input size="large" prefix={<AiOutlineUser />} placeholder="请输入邮箱" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                    <Input.Password
                        size="large"
                        prefix={<AiOutlineLock />}
                        placeholder="请输入密码"
                    />
                </Form.Item>
                <Form.Item>
                    <div className={cls.line}>
                        <Checkbox>记住密码</Checkbox>
                        <Link to="/passport/forget">忘记密码</Link>
                    </div>
                </Form.Item>
                <Form.Item>
                    <Button block loading={loading} type="primary" size="large" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
                <Link className={cls.text} to="/passport/register">
                    注册用户
                </Link>
            </Form>
        </div>
    );
};
export default PassportLogin;