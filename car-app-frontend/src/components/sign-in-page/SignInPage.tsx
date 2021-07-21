import { FunctionComponent, useContext, useState } from 'react';
import { Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {
	FormButton,
	RegisterContainerSection,
} from '../register-page/RegisterPage.styled';
import { useDatabaseContext } from '../../context/DatabaseContext';
import useLocalStorage from '../../customHooks/useLocalStorage';
import { UserContext } from '../../context/UserContext';

export const SignInPage: FunctionComponent = () => {
	const database = useDatabaseContext();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [username, setUsername] = useLocalStorage('username', '');
	const [passwordValue, setPasswordValue] = useLocalStorage('password', '');
	const { setUser } = useContext(UserContext);

	const onFinish = (values: { username: string; password: string }) => {
		setIsLoading(true);
		const returnValue = database.login({
			username: values.username,
			password: values.password,
			emailAddress: '',
			phone: undefined,
		});

		returnValue
			.then((value) => {
				if (value.isSuccess) {
					// Login here
					setUsername(values.username);
					setPasswordValue(values.password);
					if (value.user != null) {
						setUser(value.user);
					}
					window.location.href = '/';
				} else {
					message.error(value.errorMessage);
				}
			})
			.finally(() => setIsLoading(false));
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
				initialValues={{
					remember: true,
					username: username,
					password: passwordValue,
				}}
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
				<Form.Item>
					<FormButton
						loading={isLoading}
						style={{ width: '100%', marginTop: '10px' }}
						type={'primary'}
						htmlType={'submit'}
						className={'login-form-button'}
					>
						Log in
					</FormButton>
				</Form.Item>
				Or <Link to={'/register'}>register now</Link>
			</Form>
		</RegisterContainerSection>
	);
};
