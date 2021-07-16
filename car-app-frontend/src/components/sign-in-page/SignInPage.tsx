import { FunctionComponent } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { RuleObject } from 'antd/lib/form';
import { StoreValue } from 'antd/lib/form/interface';
import { RegisterContainerSection } from '../register-page/RegisterPage.styled';

export const SignInPage: FunctionComponent = () => {
	const onFinish = (values: { username: string; password: string }) => {
		console.log(values.username);
	};

	const validateUsername = () => ({
		validator(_: RuleObject, value: StoreValue) {
			if (!value || value.length >= 5) {
				return Promise.resolve();
			}

			return Promise.reject(
				new Error('The two passwords that you entered do not match!')
			);
		},
	});

	return (
		<RegisterContainerSection>
			<h1>
				Sign in to your <b>CarBidApp</b> user
			</h1>
			<Form
				name="login_form"
				className="login-form"
				initialValues={{ remember: true }}
				onFinish={onFinish}
			>
				<Form.Item
					name="username"
					rules={[
						{ required: true, message: 'Username is required!' },
						validateUsername,
					]}
				>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder={'Username'}
					/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[{ required: true, message: 'Password is required' }]}
				>
					<Input.Password
						placeholder="Password"
						prefix={<LockOutlined className="site-form-item-icon" />}
					/>
				</Form.Item>
				<Form.Item name="remember-me" valuePropName={'checked'} noStyle>
					<Checkbox>Remember me</Checkbox>
				</Form.Item>
				<Form.Item>
					<Button
						type={'primary'}
						htmlType={'submit'}
						className={'login-form-button'}
					>
						Log in
					</Button>
					Or <Link to={'/register'}>register now</Link>
				</Form.Item>
			</Form>
		</RegisterContainerSection>
	);
};
