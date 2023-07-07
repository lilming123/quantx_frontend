import { Button, Form, Input, message, Tabs } from 'antd';
import * as React from 'react'
import {Link, useHistory} from 'react-router-dom';
import PassportController from '@/ts/controller/Passport';

import cls from './index.module.css';

const PassportRegister: React.FC = () => {
    const history = useHistory();
    const registerAction = async (val: any) => {
        console.log(val)
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
        if (!/^[\u4e00-\u9fa5]{2,8}$/.test(val.name)) {
            message.warning('请输入正确的姓名');
            return;
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val.email)) {
            message.warning('请输入正确的邮箱');
            return;
        }
        // 请求
        const res = await PassportController.register(val.name, val.firstPassword, val.email);
        console.log(res)
        if (res.data.success) {
            message.success(res.data.success);
            history.push('/passport/login' );
        }else{
            message.warning(res.data.error)
        }
    };


    return (
        <div>
            <Tabs size="large" items={[{ label: '注册新用户', key: 'account' }]} />
            <Form onFinish={registerAction}>
                <Form.Item name="email" rules={[{ required: true, message: '请输入邮箱' }]}>
                    <Input size="large" placeholder="请输入邮箱" />
                </Form.Item>
                <Form.Item
                    name="firstPassword"
                    rules={[{ required: true, message: '请输入密码' }]}>
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
                <Form.Item name="name" rules={[{ required: true, message: '请输入真实姓名' }]}>
                    <Input size="large" placeholder="请输入真实姓名" />
                </Form.Item>
                <Form.Item>
                    <Button block type="primary" size="large" htmlType="submit">
                        注册
                    </Button>
                </Form.Item>
                <div className={cls.line}>
                    <div className={cls.text}>
                        已有账户?
                        <Link to="/passport/login">返回登录</Link>
                    </div>
                </div>
            </Form>
        </div>
    );
};
export default PassportRegister;