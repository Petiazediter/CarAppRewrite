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

	return (
		<RegisterContainerSection>
			<h1>
				Sign in to your <b>CarBidApp</b> user
			</h1>
			<Form
				layout="vertical"
				name="login_form"
				className="login-form"
				initialValues={{ remember: true }}
				onFinish={onFinish}
			>
				<Form.Item
					name="username"
					label="Username"
					rules={[{ required: true, message: 'Username is required!' }]}
				>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder={'Username'}
					/>
				</Form.Item>
				<Form.Item
					label="Password"
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
						style={{ width: '100%', marginTop: '10px' }}
						type={'primary'}
						htmlType={'submit'}
						className={'login-form-button'}
					>
						Log in
					</Button>
				</Form.Item>
				Or <Link to={'/register'}>register now</Link>
			</Form>
		</RegisterContainerSection>
	);
};
