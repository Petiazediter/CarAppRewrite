import { FunctionComponent } from 'react';
import { Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {
	FormButton,
	RegisterContainerSection,
} from '../register-page/RegisterPage.styled';
import useLocalStorage from '../../customHooks/useLocalStorage';
import { gql, useMutation } from '@apollo/client';
import { AuthResult } from '../register-page/RegisterPage';
import { AUTH_TOKEN } from '../..';

const LOGIN_MUTATION = gql`
	mutation LoginMutation($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			isSuccess
			errorMessage
			token
			payload {
				id
			}
		}
	}
`;

type LoginResult = {
	login: AuthResult;
};

export const SignInPage: FunctionComponent = () => {
	const [username] = useLocalStorage('username', '');
	const [passwordValue] = useLocalStorage('password', '');
	const [, setAuthToken] = useLocalStorage(AUTH_TOKEN, '');
	const [login, { loading }] = useMutation<
		LoginResult,
		{ username: string; password: string }
	>(LOGIN_MUTATION, {
		onCompleted({ login }) {
			if (login) {
				if (login.isSuccess) {
					if (login.token != null && login.payload != null) {
						setAuthToken(login.token);
						window.location.href = '/';
					}
				} else if (login.errorMessage != null) {
					message.error(login.errorMessage);
				} else {
					message.error('Unknown error!');
				}
			}
		},
		onError(error) {
			message.error(error.message);
		},
	});

	const onFinish = (values: { username: string; password: string }) => {
		login({
			variables: {
				username: values.username,
				password: values.password,
			},
		});
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
						loading={loading}
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
