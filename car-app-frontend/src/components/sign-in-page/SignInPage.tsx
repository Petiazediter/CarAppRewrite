import {FunctionComponent} from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import { Link } from 'react-router-dom'
import { useUserData, validateUsername } from "../shared/hooks/CustomHook";

export const SignInPage: FunctionComponent = () => {

    const myUser = useUserData()

    const onFinish = (values: { username: string,password: string }) => {

    }

    return (
        <section>
            USER: { myUser?.toString() }
            <Form
                 name="login_form"
                 className="login-form"
                 initialValues={{remember: true}}
                 onFinish={onFinish}>
                <Form.Item
                    name="username"
                    rules={[
                        {required: true, message: 'Username is required!'},
                        validateUsername
                    ]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />}
                           placeholder={"Username"} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {required: true, message: 'Password is required'}
                    ]}>
                    <Input.Password
                           placeholder="Password"
                           prefix={<LockOutlined className="site-form-item-icon" /> } />
                </Form.Item>
                <Form.Item
                    name="remember-me"
                    valuePropName={"checked"}
                    noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button type={"primary"} htmlType={"submit"} className={"login-form-button"}>Log in</Button>
                    Or <Link to={"/register"}>register now</Link>
                </Form.Item>
            </Form>
        </section>
    )
}