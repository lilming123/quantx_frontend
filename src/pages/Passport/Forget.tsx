import { Button, Form, Input, message, Tabs } from 'antd';
import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import PassportController from '@/ts/controller/Passport';

import cls from './index.module.css';

const PassportForget: React.FC = () => {
    const history = useHistory();

    const submit = async (val: any) => {
        if (val.firstPassword !== val.secondPassword) {
            message.warning('输入的两次密码不一致！');
            return;
        }
        const password = val.firstPassword;
        if (password.length < 6) {
            message.warning('密码的长度不能小于6');
            return;
        }
        if (password.length > 15) {
            message.warning('密码的长度不能大于15');
            return;
        }
        const reg = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,15}/;
        if (!reg.test(password)) {
            message.warning('密码必须包含：数字、字母、特殊字符');
            return;
        }
        const res = await PassportController.resetPassword(
            val.account,
            val.firstPassword,
        );
        if (res.data.success) {
            message.success('重置密码成功！');
            history.push('/passport/login' );

        } else {
            message.error(res.data.error || '重置密码失败！');
        }
    };

    return (
        <div>
            <Tabs size="large" items={[{ label: '忘记密码', key: 'title' }]} />
            <Form onFinish={submit}>
                <Form.Item name="account" rules={[{ required: true, message: '请输入邮箱' }]}>
                    <Input size="large" placeholder="请输入邮箱" />
                </Form.Item>
                <Form.Item
                    name="firstPassword"
                    rules={[{ required: true, message: '请输入新密码' }]}>
                    <Input.Password
                        size="large"
                        placeholder="请输入密码(6-15位：包含大小写字母数字和符号)"
                    />
                </Form.Item>
                <Form.Item
                    name="secondPassword"
                    rules={[{ required: true, message: '请再次输入密码' }]}>
                    <Input.Password size="large" placeholder="请再次输入密码" />
                </Form.Item>
                <Form.Item>
                    <Button
                        block
                        size="large"
                        type="primary"
                        htmlType="submit"
                        className={cls.button}>
                        提交
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Link className={cls.text} to="/passport/login">
                        返回登录
                    </Link>
                </Form.Item>
            </Form>
        </div>
    );
};
export default PassportForget;